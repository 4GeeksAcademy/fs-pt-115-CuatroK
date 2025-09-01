from flask import Blueprint
from .user_routes import user_bp
from .routes_joyas import Jewell_bp
api = Blueprint("api_bp", __name__)

api.register_blueprint(user_bp)
api.register_blueprint(Jewell_bp)