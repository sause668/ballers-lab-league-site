from .db import db, environment, SCHEMA, add_prefix_for_prod

class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    game_day_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('game_days.id')), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    
    game_day = db.relationship("Game_Day", back_populates="games")
    team_stats = db.relationship("Team_Stat", uselist=True, back_populates="game", cascade="all, delete-orphan")
    player_stats = db.relationship("Player_Stat", uselist=True, back_populates="game", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
        }

