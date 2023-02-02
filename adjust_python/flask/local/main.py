from app.index import app
from gevent.pywsgi import WSGIServer

if __name__ == '__main__':
    # debug/dev
    # app.run(debug=True, host='0.0.0.0', port=80)
    # production
    http_server = WSGIServer(('', 80), app)
    http_server.serve_forever()
