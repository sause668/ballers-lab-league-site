from .db import db, environment, SCHEMA, add_prefix_for_prod

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)

    players = db.relationship("Player", uselist=True, back_populates="team", cascade="all, delete-orphan")
    team_stats = db.relationship("Team_Stat", uselist=True, back_populates="team", cascade="all, delete-orphan")

    def get_record(team_stats):
        wins = 0
        loses = 0

        for stat in team_stats:
            if stat.win:
                wins += 1
            else:
                loses += 1
        
        return f"{wins} - {loses}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'record': 'test'
        }
