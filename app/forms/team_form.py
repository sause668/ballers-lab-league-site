from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class Team_Form(FlaskForm):
    name = StringField('name', validators=[DataRequired()])