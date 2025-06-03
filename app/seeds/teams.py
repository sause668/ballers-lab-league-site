from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text
from app.utils import roster


def seed_teams():

    for team in roster:
        db.session.add(Team(
            name=team['name']
        ))

    db.session.commit()

def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        
    db.session.commit()