"""player stats

Revision ID: 1fc274b9d638
Revises: 497e2a0bf415
Create Date: 2025-05-26 16:39:45.892379

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '1fc274b9d638'
down_revision = '497e2a0bf415'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('player_stats',
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.Column('assists', sa.Integer(), nullable=True),
    sa.Column('rebounds', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('game_id', 'player_id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE player_stats SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('player_stats')
