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
    payment_intent_id = db.Column(db.String(255), unique=True)
    status = db.Column(db.String(30), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Donation {self.amount} {self.currency} {self.status}>"
