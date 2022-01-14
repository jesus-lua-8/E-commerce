import asyncio
import random

import aiomysql
import asyncpg
from quart import Quart, render_template

from .config import QuartConfig
from .routes import blueprints


app = Quart("ecommerce")
app.config.from_object(QuartConfig())


for blueprint in blueprints:
    app.register_blueprint(blueprint)


@app.before_serving
async def setup_db():
    loop = asyncio.get_event_loop()

    if app.config["PSQL_DSN"] is not None:
        kwargs = {
            "dsn": app.config["PSQL_DSN"]
        }
    else:
        kwargs = {
            "host": app.config["PSQL_HOST"],
            "port": app.config["PSQL_PORT"],
            "user": app.config["PSQL_USER"],
            "password": app.config["PSQL_PASS"],
            "database": app.config["PSQL_DB"],
        }

    app.db_pool = await asyncpg.create_pool(
        **kwargs,
        loop=loop
    )
    mysql = await aiomysql.create_pool(
        host="blitz.cs.niu.edu",
        port=3306,
        user="student",
        password="student",
        db="csci467"
    )

    async with app.db_pool.acquire() as con:
        with open("467DDL.sql", "r", encoding="utf-8") as fp:
            ddl = fp.read()
        await con.execute(ddl)

        async with mysql.acquire() as mysqlcon:
            async with mysqlcon.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("""
                    SELECT
                        number,
                        description,
                        price,
                        weight,
                        pictureURL
                    FROM
                        parts;
                """)
                items = await cur.fetchall()

        values = ""
        for item in items:
            values += f"\n({item['number']}, '{item['description']}', {item['price']}, {item['weight']}, '{item['pictureURL']}'),"
        values = values[:-1] + ";"

        await con.execute(f"""
            INSERT INTO
                Item (
                    itemID,
                    itemName,
                    itemPrice,
                    itemWeight,
                    itemPic
                )
            VALUES {values}
        """)

        with open("467DML.sql", "r", encoding="utf-8") as fp:
            dml = fp.read()
        await con.execute(dml)

        values = ""
        for item in items:
            stock = random.randint(0, 100)
            values += f"\n({item['number']}, {stock}),"
        values = values[:-1] + ";"

        await con.execute(f"""
            INSERT INTO
                Stock (
                    itemID,
                    amount
                )
            VALUES {values}
        """)


@app.errorhandler(404)
async def not_found(_):
    return await render_template("index.html")


@app.after_serving
async def cleanup() -> None:
    """
    Closes the database pool safely.
    """
    try:
        await app.db_pool.close()
        app.mysql.close()
        await app.mysql.wait_closed()
    except Exception:
        pass
