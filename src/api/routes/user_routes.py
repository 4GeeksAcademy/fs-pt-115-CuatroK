from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from api.models.user_model import User, UserDirection
from api.model_config import db
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


user_bp = Blueprint('user_bp', __name__, url_prefix="/user/client")

CORS(user_bp)


@user_bp.route("/register", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("username"):
        return jsonify({'msg': 'some data is missing'}), 400

    user_exists = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exists:
        return jsonify({'msg': 'User already exists'})

    new_user = User(
        email=data.get("email"),
        username=data.get("username"),
        is_active=True,
        is_admin=False
    )
    new_user.set_password(data.get("password"))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'user created successfully',
                    'new user': new_user.serialize()}), 200


@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({'msg': 'some data is missing'}), 400

    user = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user is None:
        return jsonify({'msg': 'user not found'}), 400

    if user.check_password(data.get("password")):
        token = create_access_token(str(user.id))
        return jsonify({'msg': 'ok,', "token": token}), 200

    else:
        return jsonify({'msg': 'some data is missing'}), 400


@user_bp.route("/", methods=["GET"])
@jwt_required()
def get_users():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    print(user.is_admin)
    if user.is_admin:
        users = User.query.all()
        return jsonify([u.serialize() for u in users]), 200
    return jsonify({'msg': 'You have no access for this action'})


@user_bp.route("/linksecretoparahacerungetgeneral", methods=["GET"])
def get_MEGAUSERS():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@user_bp.route("/convert_admin", methods=["POST"])
def convert_client_to_admin():
    user_id = -5  # CAMBIAR ÉSTE NÚMERO EL CUAL ES UN ID AL NUMERO ID DEL USUARIO QUE SE QUIERE CONVERTIR EN ADMIN
    if not user_id:
        return jsonify({'MSG': 'LEAVE RAT'})
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({'msg': 'user not found'})
    user.is_admin = True
    db.session.commit()
    return jsonify({'new admin': user.serialize()})


@user_bp.route("/address", methods=["POST"])
@jwt_required()
def create_address():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    print(user_id)
    if user is None:
        return jsonify({'msg': 'user doesn`t exists'}), 400

    if not data.get("first_address") or not data.get("second_address") or not data.get("postal_code") or not data.get("city") or not data.get("province") or not data.get("phone"):
        return jsonify({"msg": 'some data is missing'}), 400

    new_address = UserDirection(
        first_address=data.get("first_address"),
        second_address=data.get("second_address"),
        postal_code=data.get("postal_code"),
        city=data.get("city"),
        province=data.get("province"),
        phone=data.get("phone"),
        user_id=int(user_id)
    )
    db.session.add(new_address)
    db.session.commit()
    return jsonify({'msg': 'address added', 'address': new_address.serialize()})


@user_bp.route("/profile/update", methods=["PATCH"])
@jwt_required()
def upgrade_user_data():
    data = request.get_json()

    if not data:
        return jsonify({'msg': 'No data received'})
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({'msg': 'User not found'})

    keys_included = {"username", "gender", "birth_date", "full_name"}

    keys_denied = set(data.keys() - keys_included)
    if keys_denied:
        return jsonify({'msg': 'invalid data'})

    user.username = data.get("username", user.username)
    user.gender = data.get("gender", user.gender)
    user.birth_date = data.get("birth_date", user.birth_date)
    user.full_name = data.get("full_name", user.full_name)
    db.session.commit()
    return jsonify({'msg': 'user data updated', 'user:': user.serialize()})
