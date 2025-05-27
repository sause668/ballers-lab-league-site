from app.models import db, Team_Stat, environment, SCHEMA
from sqlalchemy.sql import text


def seed_team_stats():

    team_stats = [
        {
            'team_id': 1,
            'game_id': 1,
            'home': True,
            'win': True,
            'points': 103
        },
        {
            'team_id': 2,
            'game_id': 1,
            'home': False,
            'win': False,
            'points': 102
        },
        
    ]

    for team_stat in team_stats:
        db.session.add(Team_Stat(
            team_id=team_stat['team_id'],
            game_id=team_stat['game_id'],
            home=team_stat['home'],
            win=team_stat['win'],
            points=team_stat['points'],
        ))

    db.session.commit()

def undo_team_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_stats"))
        
    db.session.commit()