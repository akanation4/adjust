import mysql.connector
import settings as s
import os
import httplib2
import datetime
import json

from oauth2client.file import Storage
from apiclient import discovery
from datetime import datetime
from dateutil import tz

JST = tz.gettz('Asia/Tokyo')


class Database:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host=s.host,
            port=s.port,
            user=s.user,
            passwd=s.passwd,
            db=s.db
        )

    def cursor(self):
        try:
            return self.connection.cursor(dictionary=True)
        except Exception as e:
            raise e

    def close(self):
        self.cursor().close()
        self.connection.close()

    def insert_user(self, sub):
        cursor = self.cursor()
        cursor.execute('INSERT INTO user (sub) VALUES (%s)', (sub,))
        self.connection.commit()

    def insert_credentials(self, sub, credential):
        cursor = self.cursor()
        cursor.execute('INSERT INTO credentials (sub, credential) VALUES (%s, %s)', (sub, credential))
        self.connection.commit()

    def exists_room_id(self, room_id):
        cursor = self.cursor()
        cursor.execute('SELECT * FROM room WHERE room_id = %s LIMIT 1', (room_id,))
        return cursor.fetchone() is not None

    def insert_room(self, room_id):
        cursor = self.cursor()
        cursor.execute('INSERT INTO room (room_id) VALUES (%s)', (room_id,))
        self.connection.commit()

    def update_user(self, sub, room_id):
        cursor = self.cursor()
        cursor.execute('UPDATE user SET room_id = %s WHERE sub = %s', (room_id, sub))
        self.connection.commit()

    def can_join_room(self, room_id):
        cursor = self.cursor()
        cursor.execute('SELECT can_join FROM room WHERE room_id = %s', (room_id,))
        return cursor.fetchone()["can_join"] == 1

    def select_user(self, room_id):
        cursor = self.cursor()
        cursor.execute('SELECT sub FROM user WHERE room_id = %s', (room_id,))
        subs = []
        for row in cursor.fetchall():
            subs.append(row["sub"])
        return subs

    def count_room_members(self, room_id):
        cursor = self.cursor()
        cursor.execute('SELECT COUNT(sub) FROM user WHERE room_id = %s', (room_id,))
        return cursor.fetchone()["COUNT(sub)"]

    def update_room(self, room_id):
        cursor = self.cursor()
        cursor.execute('UPDATE room SET can_join = 0 WHERE room_id = %s', (room_id,))
        self.connection.commit()

    def select_credentials(self, sub):
        cursor = self.cursor()
        cursor.execute('SELECT credential FROM  WHERE sub = %s', (sub,))
        return cursor.fetchone()['credential']

    def insert_events(self, sub, events):
        cursor = self.cursor()
        cursor.execute('INSERT INTO events (sub, start, end) VALUES (%s, %s, %s)', (sub, events['start'], events['end']))
        self.connection.commit()

    def select_events(self, sub):
        cursor = self.cursor()
        cursor.execute('SELECT * FROM events WHERE sub = %s', (sub,))
        return cursor.fetchall()

class Credentials:
    def get_credential_path(self):
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir, 'adjust.json')
        return credential_path

    def update_credentials(self, access_token, refresh_token):
        credential_path = self.get_credential_path
        with open(credential_path, 'w') as f:
            j_credential = json.load(f)
            j_credential['access_token'] = access_token
            j_credential['refresh_token'] = refresh_token
            j_credential['token_response']['access_token'] = access_token
            j_credential['token_response']['refresh_token'] = refresh_token
            json.dump(j_credential, f)

    def get_credentials_json_string(self):
        credential_path = self.get_credential_path
        with open(credential_path, 'r') as f:
            return json.load(f)

    def get_credentials(self, j_credential):
        credential_path = self.get_credential_path
        with open(credential_path, 'w') as f:
            f.write(j_credential)

        store = Storage(credential_path)
        o_credentials = store.get()
        if not o_credentials or o_credentials.invalid:
            raise Exception('Invalid credentials')

        return o_credentials

class Calendar:
    def load_events(self, o_credentials):
        http = o_credentials.authorize(httplib2.Http())
        service = discovery.build('calendar', 'v3', http=http)

        now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
        eventsResult = service.events().list(
            calendarId='primary', timeMin=now, maxResults=100, singleEvents=True,
            orderBy='startTime').execute()
        events = eventsResult.get('items', [])
        events = []
        for event in events:
            startZ = event['start'].get('dateTime', event['start'].get('date'))
            endZ = event['end'].get('dateTime', event['end'].get('date'))
            start = datetime.datetime.strptime(startZ, '%Y-%m-%dT%H:%M:%S%z').astimezone(JST)
            end = datetime.datetime.strptime(endZ, '%Y-%m-%dT%H:%M:%S%z').astimezone(JST)
            event.append({'start': str(start), 'end': str(end)})

        return events
