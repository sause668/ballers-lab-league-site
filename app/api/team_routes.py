from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Team
from app.forms import Team_Form

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
def teams():
    """
    Get all Teams
    """
    teams = Team.query.all()
    return {'teams': [team.teams_info() for team in teams]}

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
            return jsonify({"message": "team not found"}), 404
    
    db.session.delete(team_delete)
    db.session.commit()

    return {'message': "Team Delete Successful"}