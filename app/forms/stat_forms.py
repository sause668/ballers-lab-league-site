from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class Team_Stat_Form(FlaskForm):
    win = BooleanField('win', )
    points = IntegerField('points', default=0)

class Player_Stat_Form(FlaskForm):
    points = IntegerField('points')
    assists = IntegerField('assists')
    rebounds = IntegerField('rebounds')