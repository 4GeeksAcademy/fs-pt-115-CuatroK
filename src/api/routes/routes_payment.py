import stripe
import os
from flask import Blueprint, request, jsonify
from flask_cors import CORS

payment_bp = Blueprint("payment", __name__)
CORS(payment_bp)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")



@payment_bp.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        intent = stripe.PaymentIntent.create(
            amount=5000,
            currency="eur",
            automatic_payment_methods={"enabled": True},
            
        )
        return jsonify({"clientSecret": intent["client_secret"]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500