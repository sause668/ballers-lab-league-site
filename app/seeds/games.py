from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time


def seed_games():

    games = [
        {
            'game_day_id': 1,
            'name': 'Bulls vs Lakers',
            'start_time': time(18, 00, 00),
            'end_time': time(21, 45, 00),
        }
    ]

    for game in games:
        db.session.add(Game(
            game_day_id=game['game_day_id'],
            name=game['name'],
            start_time=game['start_time'],
            end_time=game['end_time'],
        ))

    db.session.commit()

def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()