from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():

    users = [
        {
            'username': 'test', 
            'password': 'test',
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
