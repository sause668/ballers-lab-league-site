from .db import db, environment, SCHEMA, add_prefix_for_prod

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)

    players = db.relationship("Player", uselist=True, back_populates="team", cascade="all, delete-orphan")
    team_stats = db.relationship("Team_Stat", uselist=True, back_populates="team", cascade="all, delete-orphan")

    def get_record(self, team_stats):
            wins = 0
            loses = 0

            for stat in team_stats:
                if stat['win'] == True:
                    wins += 1
                elif stat['win'] == False:
                    loses += 1
            
            return f"{wins} - {loses}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'record': self.get_record([team_stat.record() for team_stat in self.team_stats])
        }
    
    def teams_info(self):
        return {
            'id': self.id,
            'name': self.name,
            'record': self.get_record([team_stat.record() for team_stat in self.team_stats])
        }
    
    def team_info(self):
        return {
            'id': self.id,
            'name': self.name,
            'record': self.get_record([team_stat.record() for team_stat in self.team_stats]),
            'players': [player.team_info() for player in self.players]
        }
    
    def team_list(self):
        return {
            'id': self.id,
            'name': self.name
        }
