import json
from server.handlers.helpers import get_hub_from_path, get_questions_filepath

def handle_get_questions(handler, storage):
    hub = get_hub_from_path(handler.path)
    questions_file = get_questions_filepath(hub)
    data = storage.read(questions_file)
    if data is None:
        data = {}
    handler.send_response(200)
    handler.send_header('Content-type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    handler.send_header('Pragma', 'no-cache')
    handler.send_header('Expires', '0')
    handler.end_headers()
    handler.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

def handle_post_questions(handler, storage):
    hub = get_hub_from_path(handler.path)
    questions_file = get_questions_filepath(hub)
    content_length = int(handler.headers['Content-Length'])
    post_data = handler.rfile.read(content_length)
    try:
        json_data = json.loads(post_data.decode('utf-8'))
        storage.write(questions_file, json_data)
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
