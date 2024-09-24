from sqlalchemy import Column, Integer, Text, String
from flask import current_app

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Quiz(db.Model):

        __tablename__ = 'quiz'

        id = Column(Integer, primary_key=True)
        category = Column(String(2))
        question = Column(Text)
        option1 = Column(String(12))
        option2 = Column(String(12))
        option3 = Column(String(12))
        option4 = Column(String(12))
        option5 = Column(String(12))
        answer = Column(String(12))


        def __repr__(self):
            return self.question
            