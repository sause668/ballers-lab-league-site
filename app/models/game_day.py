from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import time

class Game_Day(db.Model):
    __tablename__ = 'game_days'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False, default= 'Mater Academy Charter Middle/High School, 7901 NW 103rd St, Hialeah Gardens, FL, 33016')
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False, default=time(13, 0))
    end_time = db.Column(db.Time, nullable=False, default=time(18, 0))

    games = db.relationship("Game", uselist=True, back_populates="game_day", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date': str(self.date),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
        }
    
    def game_days_info(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date': str(self.date),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
        }
    
    def game_day_info(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date': str(self.date),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
            'games': [game.game_day_info() for game in self.games]
        }
    
    def game_info(self):
        return {
            'id': self.id,
            'location': self.location,
            'date': str(self.date),
        }
    
    def list_info(self):
        return {
            'id': self.id,
            'name': self.name,
        }
