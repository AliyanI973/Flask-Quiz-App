
from flask import render_template, request, redirect, url_for, current_app,g,json, jsonify
from .model import db, Quiz
from .forms import MenuForm, QuizForm

from flask.blueprints import Blueprint

import sqlite3
import pandas as pd


routes = Blueprint('routes', __name__)

# current_app.app_context().push()


@routes.route('/', methods=["GET", "POST"])
def main():
    cate = db.session.query(Quiz.category).all() 
    form = MenuForm()
    if form.validate_on_submit():
        # cate = request.form['questions_cate']
        return redirect(url_for('quizpage'))
    # submit = request.args.get('submit')
    return render_template('main.html', form=form)

@routes.route('/quizpage', methods=["GET", "POST"])
def quizpage():
    form = QuizForm()
    con = sqlite3.connect('/home/equinox/Documents/Client Projects/local host quiz/instance/quiz.db')
    sql = pd.read_sql("SELECT * FROM quiz", con)
    df = pd.DataFrame(sql)
    option = request.form.get('options')
    
    if request.method == 'POST':
        ...
    # result_data = request.get_json()
    # print(result_data['value'])
    return render_template('quiz.html', form=form, df=json.dumps(df.to_dict()))


@routes.route('/result', methods=["GET", "POST"])
def result():
    # result_data = request.get_json(force=True)
    # print(result_data)
    # answer_data = request.args.get('answer_data')

    # print(answer_data)
    
    # if request.method == "POST":
    result = request.get_json("answer_data")
    print(result)

    # show the questions shown if the correct answer background is green else red and show the correct answer in green
    return render_template('result.html')



