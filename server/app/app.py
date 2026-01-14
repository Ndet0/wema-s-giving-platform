import os
import stripe
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models import db, Donation

# -------------------------------------------------
# App & Config
# -------------------------------------------------
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "sqlite:///wema.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

with app.app_context():
    db.create_all()

# -------------------------------------------------
# Stripe: Create Payment Intent
# -------------------------------------------------
@app.route("/api/stripe/create-payment-intent", methods=["POST"])
def create_payment_intent():
    data = request.get_json()
    amount = data.get("amount")

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency="usd",
        automatic_payment_methods={"enabled": True},
    )

    donation = Donation(
        amount=amount,
        payment_provider="stripe",
        payment_intent_id=intent.id,
        status="pending"
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({
        "clientSecret": intent.client_secret
    })

# -------------------------------------------------
# Stripe: Webhook (Payment Confirmation)
# -------------------------------------------------
@app.route("/api/stripe/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except Exception:
        return "Invalid signature", 400

    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]

        donation = Donation.query.filter_by(
            payment_intent_id=intent["id"]
        ).first()

        if donation:
            donation.status = "completed"
            db.session.commit()

    return jsonify(success=True)

# -------------------------------------------------
# PayPal: Create Order
# -------------------------------------------------
@app.route("/api/paypal/create-order", methods=["POST"])
def create_paypal_order():
    data = request.get_json()
    amount = data.get("amount")

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    donation = Donation(
        amount=amount,
        payment_provider="paypal",
        status="pending"
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({
        "donationId": donation.id
    })

# -------------------------------------------------
# PayPal: Confirm Payment
# -------------------------------------------------
@app.route("/api/paypal/confirm", methods=["POST"])
def confirm_paypal_payment():
    data = request.get_json()
    donation_id = data.get("donationId")

    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({"error": "Donation not found"}), 404

    donation.status = "completed"
    db.session.commit()

    return jsonify({"success": True})

# -------------------------------------------------
# Health Check
# -------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

# -------------------------------------------------
# Run Server
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
