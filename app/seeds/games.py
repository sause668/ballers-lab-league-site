from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text
from app.utils import schedule
from app.models import Game_Day


def seed_games():

    for game_day in schedule:
        game_day_cur = Game_Day.query.filter_by(name=game_day['name']).first().list_info()
        for game in game_day['games']:
            db.session.add(Game(
                game_day_id=game_day_cur['id'],
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