from flask import jsonify, Blueprint
from flask_cors import CORS
from api.extentions import db
from api.product.products import products
from api.models.models_joyas import Jewell


category_bp = Blueprint('category_bp', __name__)

CORS(category_bp)


@category_bp.route("/load-products", methods=["GET"])
def load_products():
    for product in products:
        new_product = Jewell(

            name=product ["name"],
            description=product ["description"],
            price=product ["price"],
            url_image=product ["url_image"],
            category=product ["category"],
            coating=product ["coating"],
            brand=product ["brand"],
            gender=product ["gender"],
            clasp=product ["clasp"],
            water_resistance=product ["water_resistance"],
            caja=product ["caja"],
            metal=product ["metal"],
            gem=product ["gem"],
            ring_type=product ["ring_type"],
            earring_type=product ["earring_type"],
            bracelet=product ["bracelet"],
            watch=product ["watch"],
            watch_bracelet_material=product ["watch_bracelet_material"],
            highlighted=product ["destacado"],
            quantity=product ["quantity"],

        )
        db.session.add(new_product)

    db.session.commit()
    return jsonify({"msg":"productos cargados"})
