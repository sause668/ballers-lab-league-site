from app.models import db, Player_Stat, environment, SCHEMA
from sqlalchemy.sql import text


def seed_player_stats():

    player_stats = [
        {
            'game_id': 1,
            'player_id': 1,
            'points': 35,
            'assists': 10,
            'rebounds': 6
        },
        {
            'game_id': 1,
            'player_id': 2,
            'points': 20,
            'assists': 12,
            'rebounds': 7
        },
        {
            'game_id': 1,
            'player_id': 3,
            'points': 35,
            'assists': 10,
            'rebounds': 12
        },
        {
            'game_id': 1,
            'player_id': 4,
            'points': 33,
            'assists': 10,
            'rebounds': 8
        },
        {
            'game_id': 1,
            'player_id': 5,
            'points': 23,
            'assists': 15,
            'rebounds': 10
        },
        {
            'game_id': 1,
            'player_id': 6,
            'points': 18,
            'assists': 8,
            'rebounds': 5
        },
    ]

    for player_stat in player_stats:
        db.session.add(Player_Stat(
            game_id=player_stat['game_id'],
            player_id=player_stat['player_id'],
            points=player_stat['points'],
            assists=player_stat['assists'],
            rebounds=player_stat['rebounds'],
        ))

    db.session.commit()

def undo_player_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.player_stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM player_stats"))
        
    db.session.commit()