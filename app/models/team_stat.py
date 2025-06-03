from .db import db, environment, SCHEMA, add_prefix_for_prod

class Team_Stat(db.Model):
    __tablename__ = 'team_stats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=False, primary_key=True)
    home = db.Column(db.Boolean)
    win = db.Column(db.Boolean)
    points = db.Column(db.Integer, default=0)
    
    game = db.relationship("Game", back_populates="team_stats")
    team = db.relationship("Team", back_populates="team_stats")

    def to_dict(self):
        return {
            'game_id': self.game_id,
            'team_id': self.team_id,
            'home': self.home,
            'win': self.win,
            'points': self.points,
        }

    def game_info(self):
        return {
            'game_id': self.game_id,
            'team_id': self.team_id,
            'team': self.team.game_info(),
            'home': self.home,
            'win': self.win,
            'points': self.points,
        }
    
    def record(self):
        return {
            'win': self.win,
        }
    
    


    

