import json
from server.config import QUESTIONS_FILE

def handle_get_questions(handler, storage):
    data = storage.read(QUESTIONS_FILE)
    if data is None:
        data = {}
    handler.send_response(200)
    handler.send_header('Content-type', 'application/json; charset=utf-8')
    handler.end_headers()
    handler.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

def handle_post_questions(handler, storage):
    content_length = int(handler.headers['Content-Length'])
    post_data = handler.rfile.read(content_length)
    try:
        json_data = json.loads(post_data.decode('utf-8'))
        storage.write(QUESTIONS_FILE, json_data)
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
