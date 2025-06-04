from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game_Day, Game
from app.forms import Game_Day_Form, Game_Form

game_day_routes = Blueprint('game-days', __name__)


@game_day_routes.route('')
def game_days():
    """
    Get all Game Days 
    """
    game_days = Game_Day.query.all()
    return {'gameDays': [game_day.game_days_info() for game_day in game_days]}

@game_day_routes.route('/<int:game_day_id>')
def game_day(game_day_id):
    """
    Get Game Day by ID
    """
    game_day = Game_Day.query.filter_by(id=game_day_id,).first()

    if not game_day:
        return jsonify({"message": "Game Day not found"}), 404
    
    return {'gameDay': game_day.game_day_info()}

@game_day_routes.route('/list')
def game_days_list():
    """
    Get all Game Days List
    """
    game_days = Game_Day.query.all()
    return {'gameDaysList': [game_day.list_info() for game_day in game_days]}

@game_day_routes.route('', methods=['POST'])
@login_required
def create_game_day():
    """
    New Game Day 
    """
    form = Game_Day_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_day_new = Game_Day(
            name=form.data['name'],
            location=form.data['location'],
            date=form.data['date'],
            start_time=form.data['start_time'],
            end_time=form.data['end_time']
        )

        db.session.add(game_day_new)
        db.session.commit()

        game_days = Game_Day.query.all()
        return {'gameDays': [game_day.game_days_info() for game_day in game_days]}, 201

    return form.errors, 400

@game_day_routes.route('/<int:game_day_id>', methods=['PUT'])
@login_required
def edit_game_day(game_day_id):
    """
    Edit Game Day 
    """
    form = Game_Day_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_day_edit = Game_Day.query.filter_by(id=game_day_id).first()

        if not game_day_edit:
            return jsonify({"message": "Game Day not found"}), 404
        
        game_day_edit.name = form.data['name']
        game_day_edit.location = form.data['location']
        game_day_edit.date = form.data['date']
        game_day_edit.start_time = form.data['start_time']
        game_day_edit.end_time = form.data['end_time']

        db.session.commit()

        game_days = Game_Day.query.all()
        return {'gameDays': [game_day.game_days_info() for game_day in game_days]}, 201

    return form.errors, 400

@game_day_routes.route('/<int:game_day_id>', methods=['DELETE'])
@login_required
def delete_game_day(game_day_id):
    """
    Delete Game Day
    """
    
    game_day_delete = Game_Day.query.filter_by(id=game_day_id,).first()

    if not game_day_delete:
            return jsonify({"message": "Game Day not found"}), 404
    
    db.session.delete(game_day_delete)
    db.session.commit()

    game_days = Game_Day.query.all()
    return {'gameDays': [game_day.game_days_info() for game_day in game_days]}, 200

"""
Game Routes
"""

@game_day_routes.route('/<int:game_day_id>/games/list')
def games_list(game_day_id):
    """
    Get all Games List
    """
    games = Game.query.filter_by(game_day_id=game_day_id).all()
    return {'gamesList': [game.list_info() for game in games]}

@game_day_routes.route('/<int:game_day_id>/games', methods=['POST'])
@login_required
def create_game(game_day_id):
    """
    New Game
    """
    form = Game_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_day = Game_Day.query.filter_by(id=game_day_id,).first()

        if not game_day:
            return jsonify({"message": "Game Day not found"}), 404

        game_new = Game(
            game_day_id=game_day_id,
            name=form.data['name'],
            start_time=form.data['start_time'],
            end_time=form.data['end_time']
        )

        db.session.add(game_new)
        db.session.commit()

        game_day = Game_Day.query.filter_by(id=game_day_id).first()
        return {'gameDay': game_day.game_day_info()}

    return form.errors, 400

@game_day_routes.route('/<int:game_day_id>/games/<int:game_id>', methods=['PUT'])
@login_required
def edit_game(game_day_id, game_id):
    """
    Edit Game
    """
    form = Game_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_day = Game_Day.query.filter_by(id=game_day_id,).first()

        if not game_day:
            return jsonify({"message": "Game Day not found"}), 404

        game_edit = Game.query.filter_by(id=game_id).first()

        if not game_edit:
            return jsonify({"message": "Game not found"}), 404
        
        game_edit.game_day_id = game_day_id
        game_edit.name = form.data['name']
        game_edit.start_time = form.data['start_time']
        game_edit.end_time = form.data['end_time']

        db.session.commit()

        game_day = Game_Day.query.filter_by(id=game_day_id).first()
        return {'gameDay': game_day.game_day_info()}

    return form.errors, 400

@game_day_routes.route('/<int:game_day_id>/games/<int:game_id>', methods=['DELETE'])
@login_required
def delete_game(game_day_id, game_id):
    """
    Delete Game 
    """

    game_day = Game_Day.query.filter_by(id=game_day_id,).first()

    if not game_day:
        return jsonify({"message": "Game Day not found"}), 404
    
    game_delete = Game.query.filter_by(id=game_id,).first()

    if not game_delete:
            return jsonify({"message": "Game not found"}), 404
    
    db.session.delete(game_delete)
    db.session.commit()

    game_day = Game_Day.query.filter_by(id=game_day_id).first()
    return {'gameDay': game_day.game_day_info()}


