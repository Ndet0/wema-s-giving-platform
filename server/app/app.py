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

# Validate Stripe key exists
stripe_key = os.getenv("STRIPE_SECRET_KEY")
if not stripe_key:
    print("WARNING: STRIPE_SECRET_KEY not set. Stripe payments will fail.")
stripe.api_key = stripe_key

with app.app_context():
    db.create_all()

# -------------------------------------------------
# Stripe: Create Payment Intent
# -------------------------------------------------
@app.route("/api/stripe/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        amount = data.get("amount")
        donor_name = data.get("donorName")
        donor_email = data.get("donorEmail")

        if not amount:
            return jsonify({"error": "Amount is required"}), 400
        
        # Validate amount is positive integer
        try:
            amount = int(amount)
            if amount <= 0:
                return jsonify({"error": "Amount must be positive"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Amount must be a valid number"}), 400

        if not stripe.api_key:
            return jsonify({"error": "Payment service not configured"}), 500

        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )

        donation = Donation(
            amount=amount,
            donor_name=donor_name,
            donor_email=donor_email,
            payment_provider="stripe",
            payment_intent_id=intent.id,
            status="pending"
        )
        db.session.add(donation)
        db.session.commit()

        return jsonify({
            "clientSecret": intent.client_secret,
            "donationId": donation.id
        })
    
    except stripe.error.StripeError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An unexpected error occurred"}), 500

# -------------------------------------------------
# Stripe: Webhook (Payment Confirmation)
# -------------------------------------------------
@app.route("/api/stripe/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    if not endpoint_secret:
        return jsonify({"error": "Webhook not configured"}), 500

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return jsonify({"error": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({"error": "Invalid signature"}), 400

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
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        amount = data.get("amount")
        donor_name = data.get("donorName")
        donor_email = data.get("donorEmail")

        if not amount:
            return jsonify({"error": "Amount is required"}), 400
        
        # Validate amount is positive integer
        try:
            amount = int(amount)
            if amount <= 0:
                return jsonify({"error": "Amount must be positive"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Amount must be a valid number"}), 400

        donation = Donation(
            amount=amount,
            donor_name=donor_name,
            donor_email=donor_email,
            payment_provider="paypal",
            status="pending"
        )
        db.session.add(donation)
        db.session.commit()

        return jsonify({
            "donationId": donation.id
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An unexpected error occurred"}), 500

# -------------------------------------------------
# PayPal: Confirm Payment
# -------------------------------------------------
@app.route("/api/paypal/confirm", methods=["POST"])
def confirm_paypal_payment():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        donation_id = data.get("donationId")
        
        if not donation_id:
            return jsonify({"error": "Donation ID is required"}), 400

        donation = Donation.query.get(donation_id)
        if not donation:
            return jsonify({"error": "Donation not found"}), 404

        donation.status = "completed"
        db.session.commit()

        return jsonify({"success": True})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An unexpected error occurred"}), 500

# -------------------------------------------------
# Get Donations (Admin)
# -------------------------------------------------
@app.route("/api/donations", methods=["GET"])
def get_donations():
    try:
        donations = Donation.query.order_by(Donation.created_at.desc()).all()
        return jsonify([{
            "id": d.id,
            "donorName": d.donor_name,
            "donorEmail": d.donor_email,
            "amount": d.amount,
            "currency": d.currency,
            "paymentProvider": d.payment_provider,
            "status": d.status,
            "createdAt": d.created_at.isoformat() if d.created_at else None
        } for d in donations])
    except Exception as e:
        return jsonify({"error": "Failed to fetch donations"}), 500

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
