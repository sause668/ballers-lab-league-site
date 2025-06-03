"""game days

Revision ID: 92711ed31676
Revises: 4646594cfd47
Create Date: 2025-05-26 16:39:09.907682

"""
from alembic import op
import sqlalchemy as sa
from datetime import time

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '92711ed31676'
down_revision = '4646594cfd47'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('game_days',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('location', sa.String(length=100), default= 'Mater Academy Charter Middle/High School, 7901 NW 103rd St, Hialeah Gardens, FL, 33016'),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('start_time', sa.Time(), default=time(13, 0)),
    sa.Column('end_time', sa.Time(), default=time(18, 0)),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE game_days SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('game_days')
