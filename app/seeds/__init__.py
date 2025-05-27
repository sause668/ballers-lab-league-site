from flask.cli import AppGroup
from .users import seed_users, undo_users
from .teams import seed_teams, undo_teams
from .players import seed_players, undo_players
from .game_days import seed_game_days, undo_game_days
from .games import seed_games, undo_games
from .team_stats import seed_team_stats, undo_team_stats
from .player_stats import seed_player_stats, undo_player_stats


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    undo_player_stats()
    undo_team_stats()
    undo_games()
    undo_game_days()
    undo_players()
    undo_teams()
    undo_users()

    seed_users()
    seed_teams()
    seed_players()
    seed_game_days()
    seed_games()
    seed_team_stats()
    seed_player_stats()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_player_stats()
    undo_team_stats()
    undo_games()
    undo_game_days()
    undo_players()
    undo_teams()
    undo_users()
