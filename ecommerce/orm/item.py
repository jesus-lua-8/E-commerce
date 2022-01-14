from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional

from quart import current_app as app


@dataclass
class Item:
    itemid: int
    itemname: str
    supplierid: int
    itempic: str
    itemprice: float
    itemweight: int
    amount: int
    suppliername: str

    @classmethod
    async def all(cls) -> List[Item]:
        async with app.db_pool.acquire() as con:
            items = await con.fetch("""
                SELECT
                    i.itemID,
                    i.itemName,
                    i.itemPrice,
                    i.itemWeight,
                    i.itemPic,
                    st.amount,
                    su.supplierName,
                    su.supplierID
                FROM
                    Item as i
                LEFT JOIN
                    Stock as st
                ON
                    i.itemID = st.itemID
                LEFT JOIN
                    ItemSupplier as isup
                ON
                    i.itemID = isup.itemID
                LEFT JOIN
                    Supplier as su
                ON
                    su.supplierID = isup.supplierID;
            """)

        return [cls(**dict(item)) for item in items]

    @classmethod
    async def from_id(cls, id_: int) -> Optional[Item]:
        async with app.db_pool.acquire() as con:
            item = await con.fetchrow("""
                SELECT
                    i.itemID,
                    i.itemName,
                    i.itemPrice,
                    i.itemWeight,
                    i.itemPic,
                    st.amount,
                    su.supplierName,
                    su.supplierID
                FROM
                    Item as i
                LEFT JOIN
                    Stock as st
                ON
                    i.itemID = st.itemID
                LEFT JOIN
                    ItemSupplier as isup
                ON
                    i.itemID = isup.itemID
                LEFT JOIN
                    Supplier as su
                ON
                    su.supplierID = isup.supplierID
                WHERE
                    i.itemID = $1;
            """, id_)

        if not item:
            return

        return cls(
            **dict(item)
        )

    async def save(self) -> None:
        async with app.db_pool.acquire() as con:
            await con.execute(
                """
                UPDATE
                    Item
                SET
                    itemName = $2,
                    itemPic = $3,
                    itemPrice = $4,
                    itemWeight = $5
                WHERE
                    itemID = $1;
                """,
                self.itemid,
                self.itemname,
                self.itempic,
                self.itemprice,
                self.itemweight
            )
            await con.execute("""
                UPDATE
                    Stock
                SET
                    amount=$2
                WHERE
                    itemID = $1;
            """, self.itemid, self.amount)
