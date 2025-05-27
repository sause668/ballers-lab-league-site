from app.models import db, Game_Day, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, time


def seed_game_days():

    game_days = [
        {
            'name': 'Season Games',
            'date': date(1997, 11, 11),
            'location': 'Chicago, IL',
            'start_time': time(18, 00, 00),
            'end_time': time(21, 45, 00),
        }
    ]

    for game_day in game_days:
        db.session.add(Game_Day(
            name=game_day['name'],
            date=game_day['date'],
            location=game_day['location'],
            start_time=game_day['start_time'],
            end_time=game_day['end_time']
        ))

    db.session.commit()

def undo_game_days():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_days RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM game_days"))
        
    db.session.commit()