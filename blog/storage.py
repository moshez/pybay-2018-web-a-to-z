import contextlib
import os

import sqlalchemy
from sqlalchemy import sql

metadata = sqlalchemy.MetaData()

create_all = metadata.create_all

posts = sqlalchemy.Table('posts', metadata,
            sqlalchemy.Column('content',
                              sqlalchemy.String),
)

def get_engine():
    db = os.environ['BLOG_DATABASE']
    return sqlalchemy.create_engine(db)

def context_connect(engine):
    return contextlib.closing(engine.connect())

def add_post(engine, content):
    with context_connect(engine) as conn:
        insert = posts.insert()
        ins_content = insert.values(
                          content=content)
        conn.execute(ins_content)

def get_posts(engine):
    with context_connect(engine) as conn:
        select = sql.select([posts])
        cursor = conn.execute(select)
        return list(cursor)
