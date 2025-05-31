from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Team, Player
from app.forms import Team_Form, Player_Form

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
def teams():
    """
    Get all Teams
    """
    teams = Team.query.all()
    return {'teams': [team.teams_info() for team in teams]}

@team_routes.route('/list')
def teams_list():
    """
    Get all Teams (names only)
    """
    teams = Team.query.all()
    return {'teams': [team.team_list() for team in teams]}

@team_routes.route('/<int:team_id>')
def team(team_id):
    """
    Get Team by ID
    """
    team = Team.query.filter_by(id=team_id,).first()

    if not team:
        return jsonify({"message": "Team not found"}), 404
    
    return {'team': team.team_info()}

@team_routes.route('', methods=['POST'])
@login_required
def create_team():
    """
    New Team 
    """
    form = Team_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        team_new = Team(
            name=form.data['name']
        )

        db.session.add(team_new)
        db.session.commit()

        teams = Team.query.all()
        return {'teams': [team.teams_info() for team in teams]}

    return form.errors, 400

@team_routes.route('/<int:team_id>', methods=['PUT'])
@login_required
def edit_team(team_id):
    """
    Edit Team
    """
    form = Team_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        team_edit = Team.query.filter_by(id=team_id).first()

        if not team_edit:
            return jsonify({"message": "Team not found"}), 404
        
        team_edit.name = form.data['name']

        db.session.commit()

        return {'team': team_edit.team_info()}

    return form.errors, 400

@team_routes.route('/<int:team_id>', methods=['DELETE'])
@login_required
def delete_team(team_id):
    """
    Delete Team 
    """
    
    team_delete = Team.query.filter_by(id=team_id,).first()

    if not team_delete:
            return jsonify({"message": "Team not found"}), 404
    
    db.session.delete(team_delete)
    db.session.commit()

    return {'message': "Team Delete Successful"}


"""
Player Routes
"""

@team_routes.route('/<int:team_id>/players', methods=['POST'])
@login_required
def new_player(team_id):
    """
    New Player 
    """
    form = Player_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        team = Team.query.filter_by(id=team_id,).first()

        if not team:
            return jsonify({"message": "Team not found"}), 404

        player_new = Player(
            team_id=team_id,
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            number=form.data['number'],
        )

        db.session.add(player_new)
        db.session.commit()

        team = Team.query.filter_by(id=team_id,).first()
        return {'team': team.team_info()}

    return form.errors, 400


@team_routes.route('/<int:team_id>/players/<int:player_id>', methods=['PUT'])
@login_required
def edit_player(team_id, player_id):
    """
    Edit Player
    """
    form = Player_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        team = Team.query.filter_by(id=team_id,).first()

        if not team:
            return jsonify({"message": "Team not found"}), 404

        player_edit = Player.query.filter_by(id=player_id).first()

        if not player_edit:
            return jsonify({"message": "Player not found"}), 404
        
        player_edit.team_id = team_id
        player_edit.first_name = form.data['first_name']
        player_edit.last_name = form.data['last_name']
        player_edit.number = form.data['number']

        db.session.commit()

        team = Team.query.filter_by(id=team_id,).first()
        return {'team': team.team_info()}

    return form.errors, 400

@team_routes.route('/<int:team_id>/players/<int:player_id>', methods=['DELETE'])
@login_required
def delete_player(team_id, player_id):
    """
    Delete Player 
    """

    team = Team.query.filter_by(id=team_id,).first()

    if not team:
        return jsonify({"message": "Team not found"}), 404
    
    player_delete = Player.query.filter_by(id=player_id,).first()

    if not player_delete:
            return jsonify({"message": "Player not found"}), 404
    
    db.session.delete(player_delete)
    db.session.commit()

    team = Team.query.filter_by(id=team_id,).first()
    return {'team': team.team_info()}