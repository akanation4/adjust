import random
import dao
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dictknife import deepmerge

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# Specify URL and function to call
@app.route('/test', methods=['GET', 'POST'])
def test():
    x = {{"start": "2023-02-03T10:45:00Z", "end": "2023-02-03T12:15:00Z", "sub": "XXX"}}
    y = {{"start": "2023-02-09T13:30:00Z", "end": "2023-02-09T13:50:00Z", "sub": "YYY"}}

    return x, 200

@app.route('/loggedin', methods=['POST'])
def loggedin():
    db = dao.Database()
    credentials = dao.Credentials()
    sub = request.json['sub']
    access_token = request.json['access_token']
    refresh_token = request.json['refresh_token']
    credentials.update_credentials(access_token, refresh_token)
    try:
        db.insert_user(sub)
        j_credentials = credentials.get_credentials_json_string()
        db.insert_credentials(sub, j_credentials)
        db.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return 'OK', 200

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

@app.route('/update', methods=['POST'])
def update():
    db = dao.Database()
    room_id = request.get_data()
    try:
        n_member = db.count_room_members(room_id)
        db.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return n_member, 200

@app.route('/adjust', methods=['POST'])
def adjust():
    db = dao.Database()
    credentials = dao.Credentials()
    calendar = dao.Calendar()
    room_id = request.get_data()
    try:
        db.update_room(room_id)
        subs = db.select_user(room_id)
        j_events_all = {}
        for sub in subs:
            j_credential = db.select_credentials(sub)
            o_credentials = credentials.get_credentials(j_credential)
            events = calendar.load_events(o_credentials)
            db.insert_events(sub, events)
            j_events = db.select_events(sub)
            j_events_all = deepmerge(j_events_all, j_events)
        db.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return json.dumps(j_events_all), 200

@app.route('/dismiss', methods=['POST'])
def close():
    return 'OK', 200
