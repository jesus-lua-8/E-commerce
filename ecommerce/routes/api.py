from dataclasses import asdict
from quart import Blueprint

from ecommerce.orm import Item
from .response import APIResponse


api_blueprint = Blueprint("api", __name__, url_prefix="/api")


@api_blueprint.route("/items", methods=["GET"])
async def items():
    items = await Item.all()
    return APIResponse(
        result=[asdict(item) for item in items]
    )

@api_blueprint.route("/items/<int:itemid>", methods=["GET"])
async def item_specific(itemid: int):
    item = await Item.from_id(itemid)
    return APIResponse(
        result=asdict(item)
    )
