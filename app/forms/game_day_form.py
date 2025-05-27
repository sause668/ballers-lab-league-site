from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired
from .validators import isTime, isDate
# from app.models import Game_Day


class Game_Day_Form(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired(), isDate])
    start_time = TimeField('start_time', validators=[DataRequired(), isTime])
    end_time = TimeField('end_time', validators=[DataRequired(), isTime])