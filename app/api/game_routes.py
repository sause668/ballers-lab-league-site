from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Team_Stat, Player, Player_Stat, Team
from app.forms import Team_Stat_Form, Player_Stat_Form
from datetime import datetime
import requests
import json
import os

API_KEY = os.environ.get("API_KEY")

game_routes = Blueprint('games', __name__)

@game_routes.route('/<int:game_id>')
def game(game_id):
    """
    Get Game by ID
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
        return jsonify({"message": "Game not found"}), 404
    
    game_info = game.game_info()
    date_arr = [int(game_date) for game_date in game_info['game_day']['date'][0:10].split('-')]
    time_arr = [int(game_time) for game_time in game_info['start_time'][0:5].split(':')]
    game_info['played'] = False if datetime(date_arr[0], date_arr[1], date_arr[2], time_arr[0], time_arr[1]) > datetime.today() else True

    return {'game': game_info}

@game_routes.route('/<int:game_id>/stats')
def game_stats(game_id):
    """
    Get Game by ID with stats
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
        return jsonify({"message": "Game not found"}), 404
    
    game_stats_info = game.game_stats_info()
    date_arr = [int(game_date) for game_date in game_stats_info['date'][0:10].split('-')]
    time_arr = [int(game_time) for game_time in game_stats_info['start_time'][0:5].split(':')]
    game_stats_info['played'] = False if datetime(date_arr[0], date_arr[1], date_arr[2], time_arr[0], time_arr[1]) > datetime.today() else True

    return {'gameStats': game_stats_info}


"""
In Game Routes
"""

@game_routes.route('/<int:game_id>/teams/<int:team_id>', methods=['POST'])
@login_required
def add_team(game_id, team_id):
    """
    Add Team
    """

    game = Game.query.filter_by(id=game_id,).first()

    if not game:
            return jsonify({"message": "Game not found"}), 404

    team_stats = Team_Stat.query.filter_by(game_id=game_id).all()

    if len(team_stats) > 1:
        return jsonify({"message": "Already Two Teams"}), 400
    
    for team_stat in team_stats:
        if team_stat.team_id == team_id:
            return jsonify({"message": "Team already in game"}), 400
    
    home = (not team_stats)

    players = Player.query.filter_by(team_id=team_id).all()

    game_new = Team_Stat(
        game_id=game_id,
        team_id=team_id,
        home=home,
    )

    for player in players:
        player_stat_new = Player_Stat(
            game_id=game_id,
            player_id = player.id
        )

        db.session.add(player_stat_new)

    db.session.add(game_new)
    db.session.commit()

    game = Game.query.filter_by(id=game_id).first()
    return {'game': game.game_info()}

@game_routes.route('/<int:game_id>/teams/<int:team_id>', methods=['DELETE'])
@login_required
def remove_team(game_id, team_id):
    """
    Remove Team 
    """

    game = Game.query.filter_by(id=game_id,).first()

    if not game:
            return jsonify({"message": "Game not found"}), 404
    
    team_stat_delete = Team_Stat.query.filter_by(game_id=game_id, team_id=team_id).first()

    if not team_stat_delete:
        return jsonify({"message": "Team not in game"}), 404
    
    player_stats = Player_Stat.query.filter_by(game_id=game_id).all()

    player_stats_delete = filter(lambda player_stat: player_stat.player.team_id == team_id, player_stats)
    
    db.session.delete(team_stat_delete)
    for player_stat in player_stats_delete:
        db.session.delete(player_stat)
    db.session.commit()

    game = Game.query.filter_by(id=game_id).first()
    return {'game': game.game_info()}

@game_routes.route('/<int:game_id>/teams/<int:team_id>', methods=['PUT'])
@login_required
def edit_team_stats(game_id, team_id):
    """
    Edit Team Stats
    """
    form = Team_Stat_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game = Game.query.filter_by(id=game_id,).first()

        if not game:
                return jsonify({"message": "Game not found"}), 404

        team_stat_edit = Team_Stat.query.filter_by(game_id=game_id, team_id=team_id).first()

        if not team_stat_edit:
            return jsonify({"message": "Team stat not found"}), 404
        
        team_stat_edit.win = form.data['win']
        team_stat_edit.points = form.data['points']

        db.session.commit()

        game = Game.query.filter_by(id=game_id).first()
        return {'gameStats': game.game_stats_info()}

    return form.errors, 400

@game_routes.route('/<int:game_id>/players/<int:player_id>', methods=['PUT'])
@login_required
def edit_player_stats(game_id, player_id):
    """
    Edit Player Stats
    """
    form = Player_Stat_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        player_stat_edit = Player_Stat.query.filter_by(game_id=game_id, player_id=player_id).first()

        if not player_stat_edit:
            return jsonify({"message": "Player stat not found"}), 404
        
        player_stat_edit.points = form.data['points']
        player_stat_edit.assists = form.data['assists']
        player_stat_edit.rebounds = form.data['rebounds']

        db.session.commit()

        game = Game.query.filter_by(id=game_id).first()
        return {'gameStats': game.game_stats_info()}

    return form.errors, 400

@game_routes.route('/<int:game_id>/import-stats', methods=['GET'])
@login_required
def import_stats(game_id):
    """
    Import Team & Player Stats from Sport Visio API
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
            return jsonify({"message": "Game not found"}), 404
    
    game_info = game.game_stats_info() 

    # Get Game Info (Teams)
    game_teams_sv_res = requests.get(f"https://prod.sportsvisio-api.com/scheduled-games/{game_info['sv_id']}", headers={
        'Authorization': f'Bearer {API_KEY}',
         })
    
    if not game_teams_sv_res.ok:
         return {'message':'Issue with API call'}, game_teams_sv_res.status_code

    game_teams_sv = game_teams_sv_res.json()

    if game_teams_sv['status'] != 'final-approved':
            return jsonify({"message": "Game stats not Ready"}), 404

    teams_sv = [{
         'name': team['team']['name'],
         'points': team['score'],
         'win': False
         } for team in game_teams_sv['teamGameAssn']]
        
    #Find Win
    if teams_sv[0]['points'] > teams_sv[1]['points']: teams_sv[0]['win'] = True
    else: teams_sv[1]['win'] = True

    for team_sv in teams_sv:
        team_stat_edit = Team_Stat.query.\
            filter_by(game_id=game_id).\
            join(Team, Team_Stat.team_id == Team.id).\
            filter_by(name=team_sv['name'].replace('and', '&').upper()).first()

        if not team_stat_edit:
            return jsonify({"message": "Team Stat not found"}), 404

        team_stat_edit.points = int(team_sv['points'])
        team_stat_edit.win = True if team_sv['win'] == True else False

        db.session.commit()

    # Get Game Info (Players)
    game_players_sv_res = requests.get(f"https://prod.sportsvisio-api.com/annotations/stats/game-player-rollup/{game_info['sv_id']}", headers={
        'Authorization': f'Bearer {API_KEY}',
         })
    
    if not game_players_sv_res.ok:
         return {'message':'Issue with API call'}, game_players_sv_res.status_code

    game_players_sv = game_players_sv_res.json()

    players_sv = [{
         'name': player['player']['name'],
         'number': player['player']['number'],
         'points': player['summary']['totalPoints'],
         'rebounds': player['summary']['totalRebounds'],
         'assists': player['summary']['assists']
         } for player in game_players_sv]
         
    # return {'l': game_players_sv}

    for player_sv in players_sv:
        player_name = player_sv['name']
        if not ' ' in player_name: continue
        i_name = player_name.index(" ")
        player_fn= player_name[0:i_name]
        player_ln= player_name[i_name+1:]
        
        player_stat_edit = Player_Stat.query.\
            filter_by(game_id=game_id).\
            join(Player, Player_Stat.player_id == Player.id).\
            filter_by(
              first_name=player_fn, 
              last_name=player_ln, 
              number= int(player_sv['number']
             )).first()

        if not player_stat_edit:
            return jsonify({"message": "Player Stat not found"}), 404

        player_stat_edit.points = int(player_sv['points'])
        player_stat_edit.rebounds = int(player_sv['rebounds'])
        player_stat_edit.assists = int(player_sv['assists'])

    game.stats_imported = True

    db.session.commit()

    game_cur = Game.query.filter_by(id=game_id).first()
    return {'gameStats': game_cur.game_stats_info()}

