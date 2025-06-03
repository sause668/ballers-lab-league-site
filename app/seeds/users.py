from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import os


def seed_users():

    users = [
        {
            'username': os.environ.get("USERNAME"),
            'password': os.environ.get("USER_PASSWORD"),
        }
    ]

    for user in users:
        db.session.add(User(
            username=user['username'], 
            password=user['password'],
        ))

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
