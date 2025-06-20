from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Team_Stat, Player, Player_Stat, Team
from app.forms import Team_Stat_Form, Player_Stat_Form
from datetime import datetime
import requests

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
    
    return {'gameStats': game.game_stats_info()}


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











@game_routes.route('/<int:game_id>/all-stats-test', methods=['GET'])
@login_required
def import_stats_test(game_id):
    res = requests.get("https://prod.sportsvisio-api.com/annotations/stats/game-player-rollup/634e4ed4-44dc-4f64-95f6-373f5bec1ddc", headers={
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQ4ZDUyOS1kOWE1LTQ1ZTItOTcwOS1mNTk3YTYzOTNlNzgiLCJhY2NvdW50SWQiOiJmM2JkYzBmMC1mMjFlLTRlYTQtOTVmNC0yMWE1NGJmZmRkMTEiLCJpYXQiOjE3NDk3NjUwNzMsImV4cCI6MTc4MTMwMTA3M30.1ll6_AbywgP6YiEm4EuwKrjvY_x4cV1zGIlct9upt6Q',
         })
    print('req', request)
    print('req', request.headers)
    
    return {
         'response': res.json(),

         }
     



































@game_routes.route('/<int:game_id>/all-stats', methods=['GET'])
@login_required
def import_stats(game_id):
    """
    Import Team & Player Stats from Sport Visio API
    """
    game = Game.query.filter_by(id=game_id,).first()

    if not game:
            return jsonify({"message": "Game not found"}), 404
    print('bah')

    game_info = game.game_stats_info()
    game_time = [int(dt) for dt in f"{game_info['date']}:{game_info['start_time']}".replace('-', ':').split(':')]
    game_ts = datetime(game_time[0], game_time[1], game_time[2], game_time[3], game_time[4]).timestamp()

    #Get Game Info
    div_id_sv = 'sv_hoopers_id' if game_info['team_stats'][0]['team']['division'] == 'Hoopers' else "sv_elite_id"
    # res = requests.get('https://prod.sportsvisio-api.com/programs/divisions/games/list/f12ebdf3-b517-4009-b018-7ae78d61787a/890d2a05-50ba-401b-97dc-8955846285cd/6ba54ff1-9f20-47f0-b0a5-118814b640fc', {
    #      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQ4ZDUyOS1kOWE1LTQ1ZTItOTcwOS1mNTk3YTYzOTNlNzgiLCJhY2NvdW50SWQiOiJmM2JkYzBmMC1mMjFlLTRlYTQtOTVmNC0yMWE1NGJmZmRkMTEiLCJpYXQiOjE3NDk3NjUwNzMsImV4cCI6MTc4MTMwMTA3M30.1ll6_AbywgP6YiEm4EuwKrjvY_x4cV1zGIlct9upt6Q',
    #      'Host': 'localhost'
    #      })
    # print('res',res.json())
    # print('headers',request.headers)
    
    # games_sv = res['items']
    games_sv = []
    
    def is_game(game_sv):
         game_sv['startTime'] == game_ts
    

    # Get Game Info (Teams)
    game_id_sv = filter(is_game, games_sv)['id']
    # res = requests.get('https://prod.sportsvisio-api.com/programs/divisions/games/list/f12ebdf3-b517-4009-b018-7ae78d61787a/890d2a05-50ba-401b-97dc-8955846285cd/6ba54ff1-9f20-47f0-b0a5-118814b640fc', {
    #      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQ4ZDUyOS1kOWE1LTQ1ZTItOTcwOS1mNTk3YTYzOTNlNzgiLCJhY2NvdW50SWQiOiJmM2JkYzBmMC1mMjFlLTRlYTQtOTVmNC0yMWE1NGJmZmRkMTEiLCJpYXQiOjE3NDk3NjUwNzMsImV4cCI6MTc4MTMwMTA3M30.1ll6_AbywgP6YiEm4EuwKrjvY_x4cV1zGIlct9upt6Q',
    #      'Host': 'localhost'
    #      })

    #game_teams_sv = res 
    game_teams_sv = []
    teams_sv = [{
         'name': team['team']['name'],
         'points': team['score']
         } for team in game_teams_sv]
    
    #Find Win
    # if teams_sv[0]['points'] > teams_sv[1]['points']: teams_sv[0]['win'] = True
    # else: teams_sv[1]['win'] = True

    for team_sv in teams_sv:
        #On Query
        # team_stat = Team_Stat.query.\
        #     join(Team, Team_Stat.team_id == Team.id).\
        #     filter_by(team_sv['name'].upper(), name=team_sv['name'].upper()).first()
        # Join Example
        # class_ = Class.query.\
        #     join(StudentClass, Class.id == StudentClass.class_id).\
        #     filter_by(student_id=student_id, class_id=class_id).first()
        
        team = Team.query.filter_by(name=team_sv['name'].upper()).first()

        if not team:
            return jsonify({"message": "Team not found"}), 404
        
        team_stat_edit = Team_Stat.query.filter_by(game_id=game_id, team_id=team.id).first()

        team_stat_edit.points = int(team_sv['points'])


    # Get Game Info (Players)
    # res = requests.get('https://prod.sportsvisio-api.com/programs/divisions/games/list/f12ebdf3-b517-4009-b018-7ae78d61787a/890d2a05-50ba-401b-97dc-8955846285cd/6ba54ff1-9f20-47f0-b0a5-118814b640fc', {
    #      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQ4ZDUyOS1kOWE1LTQ1ZTItOTcwOS1mNTk3YTYzOTNlNzgiLCJhY2NvdW50SWQiOiJmM2JkYzBmMC1mMjFlLTRlYTQtOTVmNC0yMWE1NGJmZmRkMTEiLCJpYXQiOjE3NDk3NjUwNzMsImV4cCI6MTc4MTMwMTA3M30.1ll6_AbywgP6YiEm4EuwKrjvY_x4cV1zGIlct9upt6Q',
    #      'Host': 'localhost'
    #      })

    #game_teams_sv = res 
    game_players_sv = []
    players_sv = [{
         'name': player['player']['name'],
         'number': player['player']['number'],
         'points': player['summary']['totalPoints'],
         'rebounds': player['summary']['totalRebounds'],
         'assists': player['summary']['assists']
         } for player in game_players_sv]

    for player_sv in players_sv:
        player_name = player_sv['name']
        i_name = player_name.index(" ")
        player_fn= player_name[0:i_name]
        player_ln= player_name[i_name:]

        #On Query
        # Player_stat = Player_Stat.query.\
        #     join(Player, Player_Stat.player_id == Player.id).\
        #     filter_by(
        #       first_name=player_fn.upper(), 
        #       last_name=player_ln.upper(), 
        #       number= int(player_sv['number']
        #      )).first()
        # Join Example
        # class_ = Class.query.\
        #     join(StudentClass, Class.id == StudentClass.class_id).\
        #     filter_by(student_id=student_id, class_id=class_id).first()
        

        player = Player.query.filter_by(
            first_name=player_fn.upper(), 
            last_name=player_ln.upper(), 
            number= int(player_sv['number'])
        ).first()

        if not player:
            return jsonify({"message": "Player not found"}), 404
        
        player_stat_edit = Player_Stat.query.filter_by(game_id=game_id, player_id=player.id).first()

        player_stat_edit.points = int(player_sv['points'])
        player_stat_edit.rebounds = int(player_sv['rebounds'])
        player_stat_edit.assists = int(player_sv['assists'])

    db.session.commit()

    game_cur = Game.query.filter_by(id=game_id).first()
    return {'gameStats': game_cur.game_stats_info()}

    return {
         'game_time': game_time,
         'time_stamp': game_ts
         }, 200

    # if res: 
    #     return {'res', res.json()}
    # return {'test': 'nah', 'game_id': game_id}, 200

