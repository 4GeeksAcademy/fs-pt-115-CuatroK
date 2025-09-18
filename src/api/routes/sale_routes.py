from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models.sale_model import Sale, SaleItem
from api.models.shopping_cart import ShoppingCart
from api.models.discount_model import Discount
from api.extentions import db
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime

sale_bp = Blueprint('sale_bp', __name__,
                    url_prefix="/sale", template_folder="../templates")

CORS(sale_bp)


def apply_discount(discount_code):
    if not discount_code:
        return None
    discount = Discount.query.filter_by(
        discount_code=discount_code, active=True).first()
    if discount and discount.start_date <= datetime.utcnow() <= discount.expiration_date:
        return discount
    return None


@sale_bp.route("/", methods=["POST"])
@jwt_required()
def create_sale_route():
    user_id = get_jwt_identity()

    cart_items = ShoppingCart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({'msg': 'Tu carrito está vacío'}), 400

    data = request.get_json()
    discount_code = data.get("discount_code")

    discount = apply_discount(discount_code)

    total = sum(item.jewell.price * item.quantity for item in cart_items)
    if discount:
        total -= min(discount.total, total)

    sale = Sale(user_id=user_id, discount=discount, total=total)
    db.session.add(sale)
    db.session.flush()

    for item in cart_items:
        sale_item = SaleItem(
            sale_id=sale.id,
            jewell_id=item.jewell_id,
            quantity=item.quantity
        )
        db.session.add(sale_item)

    for item in cart_items:
        db.session.delete(item)

    db.session.commit()

    return jsonify(sale.serialize()), 201


@sale_bp.route("/", methods=["GET"])
def get_sales():
    sales = Sale.query.all()
    return jsonify([s.serialize() for s in sales])
