from .db import db, environment, SCHEMA, add_prefix_for_prod

class Player_Stat(db.Model):
    __tablename__ = 'player_stats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('players.id')), nullable=False, primary_key=True)
    points = db.Column(db.Integer, default=0)
    assists = db.Column(db.Integer, default=0)
    rebounds = db.Column(db.Integer, default=0)
    
    game = db.relationship("Game", back_populates="player_stats")
    player = db.relationship("Player", back_populates="player_stats")

    def to_dict(self):
        return {
            'game_id': self.game_id,
            'points': self.points,
            'assists': self.assists,
            'rebounds': self.rebounds,
        }
    
    def game_info(self):
        return {
            'game_id': self.game_id,
            'player': self.player.to_dict(),
            'points': self.points,
            'assists': self.assists,
            'rebounds': self.rebounds,
        }



