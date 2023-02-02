import random
import dao
from flask import Flask, request, jsonify
from flask_cores import CORS

SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Adjust'
from oauth2client import client, tools
from oauth2client.file import Storage
import os
try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None


app = Flask(__name__)
CORS(app)

@api.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# Specify URL and function to call
@app.route('/test', methods=['GET', 'POST'])
def test():
    x = request.json['token_type']
    return x, 200

@app.route('/loggedin', methods=['POST'])
def loggedin():
    access_token = request.json['access_token']
    refresh_token = request.json['refresh_token']
    token_type = request.json['token_type']

@app.route('/make', methods=['POST'])
def make():
    db = dao.Database()
    sub = request.get_data()
    room_id = 0
    while True:
        room_id = random.randint(1, 9999)
        if not db.exists_room_id(room_id):
            break
    try:
        db.insert_room(room_id)
        db.update_user(sub, room_id)
        db.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return str(room_id).zfill(4), 201

@app.route('/join', methods=['POST'])
def join():
    db = dao.Database()
    sub = request.json['sub']
    room_id = request.json['room_id']
    if not db.exists_room_id(room_id):
        return 'Room does not exist', 404
    if not db.can_join_room(room_id):
        return 'Room is closed', 403
    try:
        db.update_user(sub, room_id)
        db.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return str(room_id).zfill(4), 200

# @app.route('/adjust', methods=['POST'])
# def adjust():
#     db = dao.Database()
#     credentials = dao.Credentials()
#     calendar = dao.Calendar()
#     room_id = request.get_data()
#     try:
#         db.update_room(room_id)
#         subs = db.select_user(room_id)
#         for sub in subs:
#             j_credential = db.select_credentials(sub)
#             o_credentials = credentials.get_credentials(j_credential)
#             calendar.load_events(o_credentials)
