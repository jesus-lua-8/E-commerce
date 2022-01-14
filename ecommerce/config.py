from pathlib import Path
import os

from dotenv import load_dotenv


load_dotenv(dotenv_path=Path(".") / ".env")


class QuartConfig:
    PSQL_HOST = os.getenv("PSQL_HOST")
    PSQL_PORT = int(os.getenv("PSQL_PORT"))
    PSQL_USER = os.getenv("PSQL_USER")
    PSQL_PASS = os.getenv("PSQL_PASS")
    PSQL_DB = os.getenv("PSQL_DB")

    PSQL_DSN = os.getenv("DATABASE_URL")

    QUART_AUTH_COOKIE_SECURE = False
