import mysql.connector
import settings as s
import os
import httplib2
import datetime

from oauth2client.file import Storage
from apiclient import discovery


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

    def update_room(self, room_id):
        cursor = self.cursor()
        cursor.execute('UPDATE room SET can_join = 0 WHERE room_id = %s', (room_id,))
        self.connection.commit()

    def select_credentials(self, sub):
        cursor = self.cursor()
        cursor.execute('SELECT credential FROM  WHERE sub = %s', (sub,))
        return cursor.fetchone()['credential']

    def inser_events(self, sub, events):
        cursor = self.cursor()
        cursor.execute('INSERT INTO events (sub, events) VALUES (%s, %s)', (sub, events))
        self.connection.commit()

class Credentials:
    def get_credentials(self, j_credential):
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir, 'adjust.json')
        with open(credential_path, 'w') as f:
            f.write(j_credential)

        store = Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            raise Exception('Invalid credentials')

        return credentials

class Calendar:
    def load_events(self, o_credentials):
        http = o_credentials.authorize(httplib2.Http())
        service = discovery.build('calendar', 'v3', http=http)

        now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
        eventsResult = service.events().list(
            calendarId='primary', timeMin=now, maxResults=10, singleEvents=True,
            orderBy='startTime').execute()
        events = eventsResult.get('items', [])

        return events
