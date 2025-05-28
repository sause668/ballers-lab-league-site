from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game_Day
from app.forms import Game_Day_Form

game_day_routes = Blueprint('game-days', __name__)


@game_day_routes.route('')
def game_days():
    """
    Get all Game Days IDs
    """
    game_days = Game_Day.query.all()
    return {'game_days': [game_day.to_dict() for game_day in game_days]}

# @game_day_routes.route('/list')
# def game_days():
#     """
#     Get all Game Days IDs
#     """
#     game_days = Game_Day.query.all()
#     return {'game_days': [game_day.to_dict() for game_day in game_days]}

@game_day_routes.route('/<int:game_day_id>')
def game_day(game_day_id):
    """
    Get Game Day by ID
    """
    game_day = Game_Day.query.filter_by(id=game_day_id,).first()

    if not game_day:
        return jsonify({"message": "Game Day not found"}), 404
    
    return {'game_day': game_day.to_dict()}

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
        return {'game_days': [game_day.to_dict() for game_day in game_days]}, 201

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
        return {'game_days': [game_day.to_dict() for game_day in game_days]}, 201

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
    return {'game_days': [game_day.to_dict() for game_day in game_days]}, 200

