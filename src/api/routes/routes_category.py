from flask import jsonify, Blueprint
from flask_cors import CORS
from api.extentions import db
from api.product.products import products
from sqlalchemy import func

from api.models.models_joyas import (
    Jewell,
    Category, Coating, Brand, Gender, Clasp, WaterResistance,
    CajaType, Metal, Gem, RingType, EarringType, BraceletType,
    WatchType, WatchBraceletMaterial
)


category_bp = Blueprint('category_bp', __name__)


CORS(category_bp)


CATALOGS_FIELD_TO_MODEL = {
    "category": Category,
    "coating": Coating,
    "brand": Brand,
    "gender": Gender,
    "clasp": Clasp,
    "water_resistance": WaterResistance,
    "caja": CajaType,
    "metal": Metal,
    "gem": Gem,
    "ring_type": RingType,
    "earring_type": EarringType,
    "bracelet": BraceletType,
    "watch": WatchType,
    "watch_bracelet_material": WatchBraceletMaterial,
}


def normalize_value(value):
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def upsert_catalogs_from_payload(request_payload: dict):

    for field_name, CatalogModel in CATALOGS_FIELD_TO_MODEL.items():
        field_value = normalize_value(request_payload.get(field_name))
        if not field_value:
            continue
        existing_row = CatalogModel.query.filter(
            func.lower(CatalogModel.name) == func.lower(field_value)
        ).first()
        if not existing_row:
            db.session.add(CatalogModel(name=field_value))


@category_bp.route("/load-products", methods=["GET"])
def load_products():
    for product in products:
        new_product = Jewell(

            name=product["name"],
            description=product["description"],
            price=product["price"],
            url_image=product["url_image"],
            category=product["category"],
            coating=product["coating"],
            brand=product["brand"],
            gender=product["gender"],
            clasp=product["clasp"],
            water_resistance=product["water_resistance"],
            caja=product["caja"],
            metal=product["metal"],
            gem=product["gem"],
            ring_type=product["ring_type"],
            earring_type=product["earring_type"],
            bracelet=product["bracelet"],
            watch=product["watch"],
            watch_bracelet_material=product["watch_bracelet_material"],
            highlighted=product["destacado"],
            quantity=product["quantity"],

        )
        db.session.add(new_product)
        upsert_catalogs_from_payload(product)
    db.session.commit()
    return jsonify({"msg": "productos cargados"})
