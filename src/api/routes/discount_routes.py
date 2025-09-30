from flask import jsonify, Blueprint, request, render_template
from flask_cors import CORS
from api.extentions import db, mail
from api.models.discount_model import Discount
from api.models.user_model import User
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime, timedelta
from flask_mail import Message
import os
import secrets
import string

discount_bp = Blueprint('discount_bp', __name__,
                        template_folder="../templates")

CORS(discount_bp)


def generate_discount_code(length=8):
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


@discount_bp.route("/discount", methods=["POST"])
@jwt_required()
def create_discount():
    user_id = get_jwt_identity()
    user_obj = db.session.get(User, int(user_id))
    if not user_obj:
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

    discount_code_data = "Cuatrok-"
    if data.get("discount_code"):
        discount_code_data = data.get("discount_code")

    now = datetime.utcnow()
    days_valid = data.get("days_valid", 10)
    expiration = now + timedelta(days=int(days_valid))

    discount_code = generate_discount_code(8)

    new_discount = Discount(
        user_id=user_id,
        discount_code=discount_code_data + discount_code,
        total=data.get("total"),
        expiration_date=expiration,
        active=True
    )

    # if new_discount:
    #     frontend_url = os.getenv("VITE_STRIPE_RETURN_URL")

    #     body_message = render_template(
    #         "coupon_message.html",
    #         username=user_obj.username,
    #         discount_code=new_discount.discount_code,
    #         expiration_date=new_discount.expiration_date.strftime("%d/%m/%Y"),
    #         total=data.get("total"),
    #         reset_link=frontend_url,
    #         now=datetime.utcnow()
    #     )

    #     message = Message(
    #         subject="¡Has recibido un cupon! — CuatroK",
    #         recipients=[user_obj.email],
    #         html=body_message
    #     )
    #     mail.send(message)

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
