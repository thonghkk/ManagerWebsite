import json
import urllib.parse
from server.config import DATA_DIR
from server.storage.base import BaseStorage
import os

def get_detail_filepath(hub: str, detail_id: str) -> str:
    # For now, let's store it in data/<hub>/details/
    return os.path.join(DATA_DIR, hub, 'details', f'{detail_id}.json')

def handle_get_details(handler, storage: BaseStorage):
    parsed = urllib.parse.urlparse(handler.path)
    qs = urllib.parse.parse_qs(parsed.query)
    hub = qs.get("hub", ["android"])[0]
    detail_id = qs.get("id", [None])[0]
    
    if not detail_id:
        handler.send_response(400)
        handler.end_headers()
        handler.wfile.write(b"Missing id")
        return

    filepath = get_detail_filepath(hub, detail_id)
    
    # fallback to client/src/data/details if not found in data/hub/details
    if not os.path.exists(filepath):
        client_fallback = os.path.join(DATA_DIR, '..', 'client', 'src', 'data', 'details', f'{detail_id}.json')
        if os.path.exists(client_fallback):
            filepath = client_fallback

    data = storage.read(filepath)
    
    if data is None:
        handler.send_response(404)
        handler.end_headers()
        handler.wfile.write(b"Not found")
        return

    handler.send_response(200)
    handler.send_header('Content-type', 'application/json')
    handler.end_headers()
    handler.wfile.write(json.dumps(data).encode())

def handle_post_details(handler, storage: BaseStorage):
    parsed = urllib.parse.urlparse(handler.path)
    qs = urllib.parse.parse_qs(parsed.query)
    hub = qs.get("hub", ["android"])[0]
    detail_id = qs.get("id", [None])[0]
    
    if not detail_id:
        handler.send_response(400)
        handler.end_headers()
        return

    content_length = int(handler.headers.get('Content-Length', 0))
    if content_length == 0:
        handler.send_response(400)
        handler.end_headers()
        return
        
    post_data = handler.rfile.read(content_length)
    try:
        data = json.loads(post_data.decode('utf-8'))
    except Exception:
        handler.send_response(400)
        handler.end_headers()
        return

    filepath = get_detail_filepath(hub, detail_id)
    success = storage.write(filepath, data)
    
    if success:
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success"}).encode())
    else:
        handler.send_response(500)
        handler.end_headers()
