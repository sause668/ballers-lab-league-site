from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('Username not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    username = form.data['username']
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])