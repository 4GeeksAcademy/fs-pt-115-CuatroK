from flask import jsonify, Blueprint, request
from flask_cors import CORS
from api.extentions import db
from api.models.discount_model import Discount
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime, timedelta
import secrets
import string

discount_bp = Blueprint('discount_bp', __name__)

CORS(discount_bp)


def generate_discount_code(length=8):
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


@discount_bp.route("/discount", methods=["POST"])
@jwt_required()
def create_discount():
    user = get_jwt_identity()
    if not user:
        return jsonify({'msg': 'No existe un usuario para esta acción'}), 401

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'No hay datos registrados'}), 400

    required_keys = {"total"}
    missing = required_keys - data.keys()
    if missing:
        return jsonify({
            "msg": f"Faltan campos requeridos: {', '.join(missing)}"
        }), 400

    now = datetime.utcnow()
    days_valid = data.get("days_valid", 10)
    expiration = now + timedelta(days=int(days_valid))

    discount_code = generate_discount_code(8)

    new_discount = Discount(
        user_id=user,
        discount_code="Cuatrok-" + discount_code,
        total=data.get("total"),
        expiration_date=expiration,
        active=True
    )
    db.session.add(new_discount)
    db.session.commit()

    return jsonify(new_discount.serialize()), 201


@discount_bp.route("/discount", methods=["get"])
def get_discounts():
    discounts = Discount.query.all()
    return jsonify([d.serialize() for d in discounts]), 201


@discount_bp.route("/discount/user", methods=["get"])
@jwt_required()
def get_user_discounts():
    user = get_jwt_identity()
    discounts = Discount.query.filter_by(user_id=int(user)).all()
    return jsonify([d.serialize() for d in discounts]), 201
