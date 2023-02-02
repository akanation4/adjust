from app.index import app
from gevent.pywsgi import WSGIServer

if __name__ == '__main__':
    # debug/dev
    # app.run(debug=True, host='0.0.0.0', port=8080)
    # production
    http_server = WSGIServer(('', 8080), app)
    http_server.serve_forever()
