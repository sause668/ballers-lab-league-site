from app.models import db, Team_Stat, Player_Stat, Game, Team, Game_Day, environment, SCHEMA
from sqlalchemy.sql import text
from app.utils import schedule


def seed_stats():

    for game_day in schedule:
        game_day_cur = Game_Day.query.filter_by(name=game_day['name']).first().list_info()

        for game in game_day['games']:
            game_cur = Game.query.filter_by(game_day_id=game_day_cur['id'], name=game['name']).first().list_info()
            team_home = Team.query.filter_by(name=game['teams'][0]).first().team_info()
            team_away = Team.query.filter_by(name=game['teams'][1]).first().team_info()

            game_teams = [team_home, team_away]

            for team in game_teams:
                db.session.add(Team_Stat(
                    game_id=game_cur['id'],
                    team_id=team['id'],
                    home=team['name'] == team_home['name']
                ))

                for player in team['players']:
                    db.session.add(Player_Stat(
                        game_id=game_cur['id'],
                        player_id=player['id'],
                    ))

    db.session.commit()

def undo_stats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_stats RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.player_stats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_stats"))
        db.session.execute(text("DELETE FROM player_stats"))
        
    db.session.commit()