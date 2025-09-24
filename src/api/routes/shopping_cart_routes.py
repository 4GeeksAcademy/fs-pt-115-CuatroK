from flask import Blueprint, request, jsonify
from flask_cors import CORS
from api.models.shopping_cart import ShoppingCart
from api.extentions import db
from flask_jwt_extended import get_jwt_identity, jwt_required

shopping_cart_bp = Blueprint('shopping_cart_bp', __name__,
                             url_prefix="/shopping-cart")

CORS(shopping_cart_bp)


@shopping_cart_bp.route("/", methods=["POST"])
@jwt_required()
def add_item():
    data = request.get_json()
    user = get_jwt_identity()
    if not data.get("jewell_id"):
        return jsonify({'msg': 'Los datos enviados no son validos'}), 400

    quantity = data.get("quantity", 1)
    if not isinstance(quantity, int) or quantity <= 0:
        return jsonify({'msg': 'Cantidad inválida'}), 400

    cart_item = ShoppingCart.query.filter_by(
        user_id=int(user), jewell_id=data["jewell_id"]).first()

    if cart_item:
        cart_item.add_quantity(quantity)
    else:
        cart_item = ShoppingCart(
            user_id=int(user),
            jewell_id=data["jewell_id"],
            quantity=quantity
        )
        db.session.add(cart_item)

    db.session.commit()
    return jsonify(cart_item.serialize()), 201


@shopping_cart_bp.route("/", methods=["GET"])
@jwt_required()
def get_user_cart():
    user = get_jwt_identity()

    cart_items = ShoppingCart.query.filter_by(
        user_id=int(user)).all()

    return jsonify([cart_item.serialize() for cart_item in cart_items]), 200


@shopping_cart_bp.route("/<int:cart_id>/delete-cart", methods=["DELETE"])
@jwt_required()
def delete_cart(cart_id):
    if not cart_id:
        return jsonify({'msg': 'Hubo un error al borrar el carrito'}), 400

    cart = ShoppingCart.query.filter_by(id=cart_id).first()

    db.session.delete(cart)
    db.session.commit()
    return jsonify({'msg': 'carrito borrado'}), 200


@shopping_cart_bp.route("/<int:item_id>/remove-item", methods=["DELETE"])
@jwt_required()
def remove_item(item_id):
    user = get_jwt_identity()

    cart_item = ShoppingCart.query.filter_by(
        id=item_id, user_id=int(user)).first()

    if not cart_item:
        return jsonify({'msg': 'El producto no existe en tu carrito'}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'msg': 'Producto eliminado del carrito'}), 200


@shopping_cart_bp.route("/<int:item_id>/add", methods=["POST"])
@jwt_required()
def sum_item(item_id):
    cart_item = ShoppingCart.query.get(item_id)
    cart_item.add_quantity()
    db.session.commit()
    return cart_item.serialize()


@shopping_cart_bp.route("/<int:item_id>/substract", methods=["POST"])
@jwt_required()
def substract_item(item_id):
    cart_item = ShoppingCart.query.get(item_id)
    cart_item.remove_quantity()
    db.session.commit()
    return cart_item.serialize()
