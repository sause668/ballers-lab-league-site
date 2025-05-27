from app.models import db, Player, environment, SCHEMA
from sqlalchemy.sql import text


def seed_players():

    players = [
        {
            'team_id': 1,
            'first_name': 'Mike',
            'last_name': 'Jordan',
            'number': 23
        },
        {
            'team_id': 1,
            'first_name': 'Scottie',
            'last_name': 'Pippen',
            'number': 33
        },
        {
            'team_id': 1,
            'first_name': 'Dennis',
            'last_name': 'Rodman',
            'number': 91
        },
        {
            'team_id': 2,
            'first_name': 'Kobe',
            'last_name': 'Bryant',
            'number': 8
        },
        {
            'team_id': 2,
            'first_name': 'Shaquille',
            'last_name': "O'Neal",
            'number': 34
        },
        {
            'team_id': 2,
            'first_name': 'Derek',
            'last_name': 'Fisher',
            'number': 2
        }
    ]

    for player in players:
        db.session.add(Player(
            team_id=player['team_id'],
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