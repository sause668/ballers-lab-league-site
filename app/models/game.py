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
    

    def to_dict(self):
        return {
            'id': self.id,
        }
