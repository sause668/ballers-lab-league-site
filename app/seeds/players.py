from app.models import db, Player, Team, environment, SCHEMA
from sqlalchemy.sql import text
from app.utils import roster


def seed_players():
    for team in roster:
        team_cur = Team.query.filter_by(name=team['name']).first().list_info()

        for player in team['players']:
            db.session.add(Player(
                team_id=team_cur['id'],
                first_name=player['first_name'],
                last_name=player['last_name'],
                number=player['number'],
            ))

    db.session.commit()

def undo_players():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.players RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM players"))
        
    db.session.commit()