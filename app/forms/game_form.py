from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, IntegerField
from wtforms.validators import DataRequired
from .validators import isTime
# from app.models import Game_Day


class Game_Form(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    start_time = TimeField('start_time', validators=[DataRequired(), isTime])
    end_time = TimeField('end_time', validators=[DataRequired(), isTime])