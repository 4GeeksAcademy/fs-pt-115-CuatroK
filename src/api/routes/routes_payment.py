import stripe
import os
from flask import Blueprint, jsonify, request
from flask_cors import CORS

payment_bp = Blueprint("payment", __name__)
CORS(payment_bp)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@payment_bp.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        data = request.get_json()
        if not data.get("amount"):
            return jsonify({'msg': 'No se encontró el monto'})
        intent = stripe.PaymentIntent.create(
            amount=data.get("amount") * 100,
            currency="eur",
            automatic_payment_methods={"enabled": True},

        )
        return jsonify({"clientSecret": intent["client_secret"], 'data': intent}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
