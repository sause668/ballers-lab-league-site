"""games

Revision ID: 3a2a45f0e077
Revises: 92711ed31676
Create Date: 2025-05-26 16:39:20.815526

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '3a2a45f0e077'
down_revision = '92711ed31676'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_day_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('start_time', sa.Time(), nullable=False),
    sa.Column('end_time', sa.Time(), nullable=False),
    sa.ForeignKeyConstraint(['game_day_id'], ['game_days.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE games SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('games')
