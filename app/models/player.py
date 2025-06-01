from .db import db, environment, SCHEMA, add_prefix_for_prod

class Player(db.Model):
    __tablename__ = 'players'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    
    team = db.relationship("Team", back_populates="players")
    player_stats = db.relationship("Player_Stat", uselist=True, back_populates="player", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'team_id': self.team_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'number': self.number,
        }
    
    def team_info(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'number': self.number,
        }
    
    def list_info(self):
        return {
            'id': self.id
        }

