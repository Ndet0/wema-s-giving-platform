from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Donation(db.Model):
    __tablename__ = "donations"

    # -----------------------------
    # Core Identifiers
    # -----------------------------
    id = db.Column(db.Integer, primary_key=True)

    # -----------------------------
    # Donor Info (Optional)
    # -----------------------------
    donor_name = db.Column(db.String(120), nullable=True)
    donor_email = db.Column(db.String(120), nullable=True)

    # -----------------------------
    # Payment Info
    # -----------------------------
    amount = db.Column(db.Integer, nullable=False)  # stored in cents
    amount_received = db.Column(db.Integer, nullable=True)
    currency = db.Column(db.String(10), default="usd")

    payment_provider = db.Column(db.String(20), nullable=False)  # stripe | paypal
    payment_intent_id = db.Column(db.String(255), unique=True, nullable=True)
    charge_id = db.Column(db.String(255), nullable=True)

    # -----------------------------
    # Status Tracking
    # -----------------------------
    status = db.Column(
        db.String(30),
        default="pending",
        nullable=False
    )
    failure_reason = db.Column(db.String(255), nullable=True)

    # -----------------------------
    # Stripe Webhook Idempotency
    # -----------------------------
    last_stripe_event_id = db.Column(
        db.String(255),
        nullable=True,
        unique=True
    )

    # -----------------------------
    # Timestamps
    # -----------------------------
    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # -----------------------------
    # Representation
    # -----------------------------
    def __repr__(self):
        return (
            f"<Donation id={self.id} "
            f"amount={self.amount} "
            f"currency={self.currency} "
            f"status={self.status} "
            f"provider={self.payment_provider}>"
        )
