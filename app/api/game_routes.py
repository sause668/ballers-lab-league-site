from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Team_Stat, Player, Player_Stat
from app.forms import Team_Stat_Form, Player_Stat_Form

game_routes = Blueprint('games', __name__)

@game_routes.route('/<int:game_id>')
def game(game_id):
    """
    Get Game by ID
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
        return jsonify({"message": "Game not found"}), 404
    
    return {'game': game.game_info()}

@game_routes.route('/<int:game_id>/stats')
def game_stats(game_id):
    """
    Get Game by ID with stats
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
        return jsonify({"message": "Game not found"}), 404
    
    return {'game': game.game_stats_info()}


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
        return {'game': game.game_stats_info()}

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
        return {'game': game.game_stats_info()}

    return form.errors, 400

