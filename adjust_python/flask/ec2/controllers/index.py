from flask import Flask, request

app = Flask(__name__)

# Specify URL and function to call
@app.route('/test', methods=['GET'])
def test():
    return 'Hello World!'
