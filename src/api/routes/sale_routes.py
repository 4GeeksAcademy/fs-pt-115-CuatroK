from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from api.models.sale_model import Sale
from api.models.user_model import User
from api.models.models_joyas import Jewell
from api.extentions import db, mail
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt

sale_bp = Blueprint('sale_bp', __name__,
                    url_prefix="/sale", template_folder="../templates")

CORS(sale_bp)


@sale_bp.route("/", methods=["POST"])
def create_sale():
    data = request.get_json()
    user = db.session.execute(db.select(User).where(
        User.id == data.get("user"))).scalar_one_or_none()
    if not user:
        return jsonify({'msg': 'Hubo error en el usuario'}), 400
    jewell = db.session.execute(db.select(Jewell).where(
        Jewell.id == data.get("jewell"))).scalar_one_or_none()
    if not jewell:
        return jsonify({'msg': 'Hubo error en la joya'}), 400
    quantity = data.get("quantity")
    if not isinstance(quantity, int) or quantity <= 0:
        return jsonify({'msg': 'Cantidad inválida'}), 400

    required_fields = {"user", "jewell", "quantity"}

    for field in required_fields:
        if not data.get(field):
            return jsonify({"msg": f"{field} es obligatorio"}), 400

    keys_denied = set(data.keys()) - required_fields
    if keys_denied:
        return jsonify({'msg': f'Campos inválidos: {list(keys_denied)}'}), 400

    transaction = Sale(
        user_id=user.id,
        jewell_id=jewell.id,
        quantity=quantity
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({'new_transaction': transaction.serialize()}), 201


@sale_bp.route("/", methods=["GET"])
def get_sales():
    sales = Sale.query.all()
    return jsonify([s.serialize() for s in sales])
