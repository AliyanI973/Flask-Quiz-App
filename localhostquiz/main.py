from flask import Flask, render_template, request, redirect, url_for, current_app,g,json, jsonify
from flask_wtf.csrf import CSRFProtect


import os


import sqlite3
import pandas as pd


from sqlalchemy import Column, Integer, Text, String
from flask_sqlalchemy import SQLAlchemy


from wtforms import SubmitField, SelectField, IntegerField, RadioField
from flask_wtf import FlaskForm
from wtforms.validators import data_required




def create_app():
    
    app = Flask(__name__, template_folder='templates', static_folder='static')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SECRET_KEY'] = 'itsasecret'

    csrf = CSRFProtect()
    db = SQLAlchemy()

        
    csrf.init_app(app)
    db.init_app(app)
    app.app_context().push()
    
    
    # with current_app.app_context().push():
    #     db.create_all()
    
    
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
                return  self.question
            
    class QuizDone(db.Model):
        
        __tablename__ = 'quiz_done'
        
        id = Column(Integer, primary_key=True)
        quesion_id = Column(Integer)
        question = Column(Text)
        correct_answer = Column(String(12))
        student_answer = Column(String(12))
        
    def __repr__(self):
        return f"{self.question} correct answer is {self.correct_answer} and giving by student is {self.stdent_answer}"
    
            
    # class MenuForm(FlaskForm):
    # # questions_qty = IntegerField(validators=[data_required("Input Required")])
    #     choices = list(Quiz.query.with_entities(Quiz.category).distinct())
    #     for t in choices:
    #         alist = [i for i in t]
    #     # loop through tuple and its each value and append that to lists
    #     questions_cate = SelectField("Questions Category",validators=[data_required("Input Required")], choices=alist)
    #     submit = SubmitField("Start")


    # Should I use flask form?
    class QuizForm(FlaskForm):
        options = RadioField(choices=[Quiz.option1, Quiz.option2,Quiz.option3,Quiz.option4,Quiz.option5])
        #  Should return depending on the index of question
    
    
    
    @app.route('/', methods=["GET", "POST"])
    def main():
        # cate = db.session.query(Quiz.category).all() 
        # form = MenuForm()
        # if form.validate_on_submit():
        #     # cate = request.form['questions_cate']
        #     return redirect(url_for('quizpage'))
        # # submit = request.args.get('submit')
        return render_template('main.html', ) # form=form)

    @app.route('/quizpage', methods=["GET", "POST"])
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
    
    @app.route('/result', methods=["GET", "POST"])
    def result():
        # result_data = request.get_json(force=True)
        # print(result_data)
        # answer_data = request.args.get('answer_data')

        # print(answer_data)
        
        # if request.method == "POST":
        result = request.get_json("answer_data")
        print(result)


    return app




# Show questions and its option filtered by id 

"""
Providing my programming services. Using Python and Mostly its Website Back-End Developer but if need be of other services then please, do mention. This provision of services is to build my portfolio. Its free so, do try me. 
Thank you.


"""

# If the things that are ignored can be used ?

# https://www.olx.com.pk/profile/aaef405e-e7c0-45d9-8713-191c2678d811