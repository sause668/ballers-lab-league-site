from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Game_Day
from app.forms import Game_Form

game_routes = Blueprint('games', __name__)

@game_routes.route('/<int:game_id>')
def game(game_id):
    """
    Get Game by ID
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
        return jsonify({"message": "Game not found"}), 404
    
    return {'game': game.game_day_info()}

# @game_routes.route('/<int:game_id>/info')
# def game(game_id):
#     """
#     Get Game by ID
#     """
#     game = Game.query.filter_by(id=game_id,).first()

#     if not game:
#         return jsonify({"message": "Game not found"}), 404
    
#     return {'game': game.game_info()}

@game_routes.route('', methods=['POST'])
@login_required
def create_game():
    """
    New Game ****Add to GameDay Routes******
    """
    form = Game_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_new = Game(
            game_day_id=form.data['game_day_id'],
            name=form.data['name'],
            start_time=form.data['start_time'],
            end_time=form.data['end_time']
        )

        db.session.add(game_new)
        db.session.commit()

        game_days = Game_Day.query.all()
        return {'game_days': [game_day.to_dict() for game_day in game_days]}

    return form.errors, 400

@game_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def edit_game(game_id):
    """
    Edit Game
    """
    form = Game_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        game_edit = Game.query.filter_by(id=game_id).first()

        if not game_edit:
            return jsonify({"message": "Game not found"}), 404
        
        game_edit.game_day_id = form.data['game_day_id']
        game_edit.name = form.data['name']
        game_edit.start_time = form.data['start_time']
        game_edit.end_time = form.data['end_time']

        db.session.commit()

        game_days = Game_Day.query.all()
        return {'game_days': [game_day.to_dict() for game_day in game_days]}

    return form.errors, 400

@game_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def delete_game(game_id):
    """
    Delete Game 
    """
    
    game_delete = Game.query.filter_by(id=game_id,).first()

    if not game_delete:
            return jsonify({"message": "Game not found"}), 404
    
    db.session.delete(game_delete)
    db.session.commit()

    game_days = Game_Day.query.all()
    return {'game_days': [game_day.to_dict() for game_day in game_days]}



