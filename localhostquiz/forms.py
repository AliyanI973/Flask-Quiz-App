
from flask_wtf import FlaskForm
from wtforms import SubmitField, SelectField, IntegerField, RadioField
from .model import Quiz
from wtforms.validators import data_required
from flask import current_app

current_app.app_context().push()

class MenuForm(FlaskForm):
    # questions_qty = IntegerField(validators=[data_required("Input Required")])
    choices = list(Quiz.query.with_entities(Quiz.category).distinct())
    for t in choices:
        alist = [i for i in t]
    # loop through tuple and its each value and append that to lists
    questions_cate = SelectField("Questions Category",validators=[data_required("Input Required")], choices=alist)
    submit = SubmitField("Start")


# Should I use flask form?
class QuizForm(FlaskForm):
    options = RadioField(choices=[Quiz.option1, Quiz.option2,Quiz.option3,Quiz.option4,Quiz.option5])
    #  Should return depending on the index of question
    