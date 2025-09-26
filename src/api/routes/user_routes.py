from flask import Flask, request, jsonify, Blueprint, render_template, url_for
from flask_cors import CORS
from api.models.user_model import User, UserDirection
from api.models.models_joyas import Jewell
from api.extentions import db, mail
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from flask_mail import Message
from datetime import date, timedelta, datetime
import os

user_bp = Blueprint('user_bp', __name__,
                    url_prefix="/user/client", template_folder="../templates")

CORS(user_bp)


@user_bp.route("/register", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("username") or not data.get("confPassword"):
        return jsonify({'msg': 'Faltan espacios por rellenar'}), 400

    user_exists = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exists:
        return jsonify({'msg': 'Ya existe una cuenta con éste email'}), 400

    if data.get("password") != data.get("confPassword"):
        return jsonify({'msg': 'Contraseñas no coinciden'}), 400

    new_user = User(
        email=data.get("email"),
        username=data.get("username"),
        is_active=True,
        is_admin=False
    )
    new_user.set_password(data.get("password"))
    db.session.add(new_user)
    db.session.commit()

    frontend_url = os.getenv("VITE_STRIPE_RETURN_URL")
    body_message = render_template(
        "welcome_message.html",
        username=new_user.username,
        reset_link=frontend_url,
        now=datetime.utcnow())
    message = Message(
        subject="Bienvenido joven",
        recipients=[data.get("email")],
        html=body_message
    )
    mail.send(message)

    return jsonify({'msg': 'user created successfully',
                    'new user': new_user.serialize()}), 200


@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({'msg': 'Faltan espacios por rellenar'}), 400

    user = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user is None:
        return jsonify({'msg': 'No existe una cuenta con los datos otorgados'}), 400

    if user.check_password(data.get("password")):
        token = create_access_token(str(user.id),
                                    additional_claims={"type": "access"})
        return jsonify({'msg': 'ok,', "token": token}), 200

    else:
        return jsonify({'msg': 'No existe una cuenta con los datos otorgados'}), 400


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


@user_bp.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify("Usuario no registrado"), 400
    user = db.session.get(User, int(user_id))
    return jsonify(user.serialize()), 200


@user_bp.route("/convert_admin", methods=["POST"])
def convert_client_to_admin():
    user_id = -5  # CAMBIAR ÉSTE NÚMERO EL CUAL ES UN ID AL NUMERO ID DEL USUARIO QUE SE QUIERE CONVERTIR EN ADMIN
    if not user_id:
        return jsonify({'MSG': 'LEAVE RAT'}), 400
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({'msg': 'user not found'}), 400
    user.is_admin = True
    db.session.commit()
    return jsonify({'new admin': user.serialize()}), 200


@user_bp.route("/address", methods=["POST"])
@jwt_required()
def create_address():
    claims = get_jwt()
    if claims.get("type") != "access":
        return jsonify({"msg": "Token inválido para esta acción"}), 400
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if user is None:
        return jsonify({'msg': 'user doesn`t exists'}), 400

    required_fields = {"first_address",
                       "postal_code", "city", "province", "phone"}

    optional_fields = {"second_address"}

    allowed_fields = required_fields | optional_fields

    for field in required_fields:
        if not data.get(field):
            return jsonify({"msg": f"{field} es obligatorio"}), 400

    keys_denied = set(data.keys()) - allowed_fields
    if keys_denied:
        return jsonify({'msg': f'Campos inválidos: {list(keys_denied)}'}), 400

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

    return jsonify({'msg': 'address added', 'address': new_address.serialize()}), 200


@user_bp.route("/address/<int:address_id>", methods=["PATCH"])
@jwt_required()
def update_address(address_id):
    claims = get_jwt()
    if claims.get("type") != "access":
        return jsonify({"msg": "Token inválido para esta acción"}), 400
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    current_address = user.address[address_id]

    print(user_id)
    if user is None:
        return jsonify({'msg': 'user doesn`t exists'}), 400

    required_fields = {"first_address",
                       "postal_code", "city", "province", "phone"}

    optional_fields = {"second_address"}

    allowed_fields = required_fields | optional_fields

    for field in required_fields:
        if not data.get(field):
            return jsonify({"msg": f"{field} es obligatorio"}), 400

    keys_denied = set(data.keys()) - allowed_fields
    if keys_denied:
        return jsonify({'msg': f'Campos inválidos: {list(keys_denied)}'}), 400

    current_address.first_address = data.get("first_address"),
    current_address.second_address = data.get("second_address"),
    current_address.postal_code = data.get("postal_code"),
    current_address.city = data.get("city"),
    current_address.province = data.get("province"),
    current_address.phone = data.get("phone"),
    db.session.commit()
    return jsonify({'msg': 'address added', 'address': current_address.serialize()}), 200


@user_bp.route("/user", methods=["PATCH"])
@jwt_required()
def upgrade_user_data():
    claims = get_jwt()
    if claims.get("type") != "access":
        return jsonify({"msg": "Token inválido para esta acción"}), 400
    data = request.get_json()

    if not data:
        return jsonify({'msg': 'No data received'}), 400
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({'msg': 'User not found'}), 400

    keys_included = {"username", "gender", "birth_date", "full_name"}

    keys_denied = set(data.keys()) - keys_included
    if keys_denied:
        return jsonify({'msg': 'invalid data'}), 400

    user.username = data.get("username", user.username)
    user.gender = data.get("gender", user.gender)
    if data["birth_date"]:
        user.birth_date = date.fromisoformat(data["birth_date"])
    user.full_name = data.get("full_name", user.full_name)
    db.session.commit()
    return jsonify({'msg': 'user data updated', 'user': user.serialize()}), 200


@user_bp.route("/address/<int:address_id>", methods=["Delete"])
@jwt_required()
def delete_address(address_id):
    claims = get_jwt()
    if claims.get("type") != "access":
        return jsonify({"msg": "Token inválido para esta acción"}), 400
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    current_address = user.address[address_id]
    if not current_address:
        return jsonify({'msg': 'Direccón no encontrada'}), 400

    db.session.delete(current_address)
    db.session.commit()
    return jsonify({'msg': 'Dirección borrada', 'Dirección': current_address.serialize()}), 200


@user_bp.route("/email-change-password", methods=["POST"])
def email_change_password():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return jsonify({'msg': 'Email no encontrado'}), 400
    user = User.query.filter_by(email=email).first()

    if user:
        reset_token = create_access_token(
            identity=str(user.id),
            expires_delta=timedelta(minutes=15),
            additional_claims={'type': "pw_reset"}
        )
        frontend_url = f'https://musical-robot-g44jp7xjvrwj299vr-3000.app.github.dev/reset-password-form?token={reset_token}'
        body_message = render_template(
            "email_change_password.html",
            username=user.username,
            reset_link=frontend_url
        )
        message = Message(
            subject="Restablece tu contraseña — CuatroK",
            recipients=[user.email],
            html=body_message
        )
        mail.send(message)
        return jsonify(msg='se ha enviado un correo con instrucciones'), 200

    return jsonify(msg='Hubo un error al enviar el correo'), 200


@user_bp.route("/reset-password", methods=["POST"])
@jwt_required()
def reset_password():
    claims = get_jwt()
    if claims.get("type") != "pw_reset":
        return jsonify({"msg": "Token inválido para este propósito"}), 403

    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json()
    new_password = data.get("password")
    if not new_password:
        return jsonify({"msg": "La contraseña es requerida"}), 400

    user.set_password(new_password)  # tu función de hashing
    db.session.commit()

    return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200


@user_bp.route("/register-google", methods=["POST"])
def create_user_google():
    data = request.get_json()
    name = data.get("name")

    user_exists = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exists:
        token = create_access_token(str(user_exists.id),
                                    additional_claims={"type": "access"})
        return jsonify({'msg': 'user created successfully',
                        'user': user_exists.serialize(),
                        'token': token}), 200

    new_user = User(
        email=data.get("email"),
        username=data.get("username"),
        password='',
        is_active=True,
        full_name=name,
        is_admin=False
    )
    db.session.add(new_user)
    db.session.commit()

    frontend_url = os.getenv("VITE_STRIPE_RETURN_URL")
    body_message = render_template(
        "welcome_message.html",
        username=new_user.username,
        reset_link=frontend_url,
        now=datetime.utcnow())
    message = Message(
        subject="Bienvenido a CuatroK",
        recipients=[data.get("email")],
        html=body_message
    )
    mail.send(message)
    token = create_access_token(str(new_user.id),
                                additional_claims={"type": "access"})

    return jsonify({'msg': 'user created successfully',
                    'user': new_user.serialize(),
                    'token': token}), 200


@user_bp.route("add-favorite", methods=["POST"])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.get_json()
    jewell_id = data.get("jewell_id")

    if not jewell_id:
        return jsonify({'msg': 'Debe proporcionar un jewell_id'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    jewell = Jewell.query.get(jewell_id)
    if not jewell:
        return jsonify({'msg': 'Joya no encontrada'}), 404

    if jewell not in user.favorites:
        user.favorites.append(jewell)
        db.session.commit()

    return jsonify({'msg': 'Favorito añadido', 'jewell': jewell.serialize()}), 200


@user_bp.route("remove-favorite", methods=["DELETE"])
@jwt_required()
def remove_favorite():
    user_id = get_jwt_identity()
    data = request.get_json()
    jewell_id = data.get("jewell_id")

    if not jewell_id:
        return jsonify({'msg': 'Debe proporcionar un jewell_id'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    jewell = Jewell.query.get(jewell_id)
    if not jewell:
        return jsonify({'msg': 'Joya no encontrada'}), 404

    if jewell in user.favorites:
        user.favorites.remove(jewell)
        db.session.commit()

    return jsonify({'msg': 'Favorito eliminado', 'jewell': jewell.serialize()}), 200


@user_bp.route("favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    return jsonify(user.serialize()["favorites"])
