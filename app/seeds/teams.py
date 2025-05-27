from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text


def seed_teams():

    teams = [
        {
            'name': 'Bulls'
        },
        {
            'name': 'Lakers'
        }
    ]

    for team in teams:
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