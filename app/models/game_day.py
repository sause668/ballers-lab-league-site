from .db import db, environment, SCHEMA, add_prefix_for_prod

class Game_Day(db.Model):
    __tablename__ = 'game_days'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    

    def to_dict(self):
        return {
            'id': self.id,
        }