from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Donation(db.Model):
    __tablename__ = "donations"

    id = db.Column(db.Integer, primary_key=True)
    donor_name = db.Column(db.String(120), nullable=True)
    donor_email = db.Column(db.String(120), nullable=True)
    amount = db.Column(db.Integer, nullable=False)  # stored in cents
    currency = db.Column(db.String(10), default="usd")
    payment_provider = db.Column(db.String(20))  # stripe | paypal
    # Changed: unique=True only when not NULL (PayPal donations don't have this)
    payment_intent_id = db.Column(db.String(255), nullable=True, unique=False)
    status = db.Column(db.String(30), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Donation {self.id}: {self.amount} {self.currency} - {self.status}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "donorName": self.donor_name,
            "donorEmail": self.donor_email,
            "amount": self.amount,
            "currency": self.currency,
            "paymentProvider": self.payment_provider,
            "status": self.status,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None
        }
