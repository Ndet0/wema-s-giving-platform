import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from app import app
from models import db, Donation

with app.app_context():
    db.drop_all()
    db.create_all()
    print("Database reset successfully")
