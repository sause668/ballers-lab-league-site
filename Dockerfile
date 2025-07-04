FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG USER_PASSWORD
ARG USERNAME
ARG API_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .
# RUN flask seed undo
# RUN flask db downgrade base
RUN flask db upgrade head
# RUN flask seed all
RUN flask seed cur
CMD gunicorn app:app