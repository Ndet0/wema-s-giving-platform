import os
import stripe
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timezone

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
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

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
        automatic_payment_methods={
            "enabled": True,
            "allow_redirects": "never"
        },
        metadata={
            "platform": "wema",
            "type": "donation"
        }
    )

    donation = Donation(
        amount=amount,
        currency="usd",
        payment_provider="stripe",
        payment_intent_id=intent.id,
        status="pending",
        created_at=datetime.now(timezone.utc)
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({"clientSecret": intent.client_secret})

# -------------------------------------------------
# Stripe: Webhook (Authoritative & Idempotent)
# -------------------------------------------------
@app.route("/api/stripe/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except Exception:
        return "Invalid signature", 400

    event_type = event["type"]
    event_id = event["id"]
    data = event["data"]["object"]

    # Idempotency: ignore already-processed events
    donation = None
    if hasattr(data, "id"):
        donation = Donation.query.filter_by(
            payment_intent_id=data.id
        ).first()

    if not donation:
        return jsonify(success=True)

    # Prevent duplicate processing
    if donation.last_stripe_event_id == event_id:
        return jsonify(success=True)

    donation.last_stripe_event_id = event_id
    donation.updated_at = datetime.now(timezone.utc)

    # ---- EVENT HANDLING ----
    if event_type == "payment_intent.created":
        donation.status = "processing"

    elif event_type == "payment_intent.succeeded":
        donation.status = "completed"
        donation.charge_id = data.latest_charge
        donation.amount_received = data.amount_received
        donation.currency = data.currency

    elif event_type == "payment_intent.payment_failed":
        donation.status = "failed"
        donation.failure_reason = (
            data.last_payment_error.message
            if data.last_payment_error
            else "unknown"
        )

    elif event_type == "charge.refunded":
        donation.status = "refunded"

    # Ignore other events safely
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
        currency="usd",
        payment_provider="paypal",
        status="pending",
        created_at=datetime.now(timezone.utc)
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({"donationId": donation.id})

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
    donation.updated_at = datetime.now(timezone.utc)

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
    app.run(debug=False)
