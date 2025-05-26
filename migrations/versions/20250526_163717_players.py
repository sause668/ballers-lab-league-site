"""empty message

Revision ID: 4646594cfd47
Revises: f7eabf513b9a
Create Date: 2025-05-26 16:37:17.763596

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '4646594cfd47'
down_revision = 'f7eabf513b9a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('number', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE players SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('players')
