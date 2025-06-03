from app.models import db, Game_Day, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, time
from app.utils import schedule


def seed_game_days():

    for game_day in schedule:
        db.session.add(Game_Day(
            name=game_day['name'],
            date=game_day['date'],
        ))

    db.session.commit()

def undo_game_days():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_days RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM game_days"))
        
    db.session.commit()