from flask import Blueprint
from .user_routes import user_bp
from .routes_joyas import Jewell_bp
from .routes_payment import payment_bp
from .sale_routes import sale_bp
api = Blueprint("api_bp", __name__)

api.register_blueprint(user_bp)
api.register_blueprint(Jewell_bp)
api.register_blueprint(payment_bp)
api.register_blueprint(sale_bp)
