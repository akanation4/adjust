from __future__ import print_function
import httplib2
import os

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

import datetime

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/adjust.json
SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Adjust'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'adjust.json')
    print('credential_path:', credential_path)

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        print('Invalid credentials')
        scopes = " ".join([SCOPE])
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scopes)
        flow.user_agent = APPLICATION_NAME
        args = tools.argparser.parse_args()
        args.noauth_local_webserver = True
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    print('start:', credentials, ':end')
    return credentials

# def get_user_info(credentials):
#     """Send a request to the UserInfo API to retrieve the user's information.

#     Args:
#       credentials: oauth2client.client.OAuth2Credentials instance to authorize the
#                    request.
#     Returns:
#       User information as a dict.
#     """

#     user_info_service = discovery.build('oauth2', 'v2',credentials=credentials)
#     user_info = user_info_service.userinfo().get().execute()
#     if user_info and user_info.get('id'):
#         return user_info
#     else:
#         print('An error occurred.')

def get_events(credentials):
    """Send a request to the Calendar API to retrieve the user's events.

    Args:
      credentials: oauth2client.client.OAuth2Credentials instance to authorize the
                   request.
    Returns:
      List of events as a dict.
    """

    http = credentials.authorize(httplib2.Http())
    service = discovery.build('calendar', 'v3', http=http)

    now = datetime.datetime.now().isoformat() + '+0900' # 'Z' indicates UTC time
    eventsResult = service.events().list(
        calendarId='primary', timeMin=now, maxResults=10, singleEvents=True,
        orderBy='startTime').execute()
    events = eventsResult.get('items', [])

    return events

def main():
    """Shows basic usage of the UserInfo API and the Google Calendar API.

    Creates a Google Calendar API service object and outputs a list of the next
    10 events on the user's calendar and user's email.
    """
    credentials = get_credentials()
    # user_email = get_user_info(credentials)['email']
    # print(get_user_info(credentials))

    events = get_events(credentials)
    if not events:
        print('No upcoming events found.')
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        end = event['end'].get('dateTime', event['end'].get('date'))
        print(start, end, 'ここにsubが入る')

if __name__ == '__main__':
    main()
