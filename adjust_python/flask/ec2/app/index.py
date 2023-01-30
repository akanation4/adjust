import os
from flask import Flask

app = Flask(__name__)

# Specify URL and function to call
@app.route('/test', methods=['GET'])
def test():
    return 'Hello World!'
