from localhostquiz.main import create_app


app = create_app()

if __name__=='__main__':
    app.run(debug=True)


"""
Quiz Ends on timer
Quiz once ended cant be restored
"""