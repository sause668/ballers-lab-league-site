"""teams stats

Revision ID: 497e2a0bf415
Revises: 3a2a45f0e077
Create Date: 2025-05-26 16:39:36.273150

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '497e2a0bf415'
down_revision = '3a2a45f0e077'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('team_stats',
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('home', sa.Boolean(), nullable=True),
    sa.Column('win', sa.Boolean(), nullable=True),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('game_id', 'team_id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE team_stats SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('team_stats')
