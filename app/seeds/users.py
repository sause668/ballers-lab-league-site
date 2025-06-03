from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():

    db.session.add(User(
        username='livadmin', 
        password='ballerswithsoul94',
    ))

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
