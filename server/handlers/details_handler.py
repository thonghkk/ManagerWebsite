import json
import urllib.parse
from server.config import DATA_DIR
from server.models.utils import get_query_param, get_post_data
from server.storage.base import BaseStorage
import os

def get_detail_filepath(hub: str, detail_id: str) -> str:
    # Use client/src/data/details by default for backward compatibility or data/hub/details
    # For now, let's store it in data/<hub>/details/
    return os.path.join(DATA_DIR, hub, 'details', f'{detail_id}.json')

def handle_get_details(handler, storage: BaseStorage):
    hub = get_query_param(handler.path, 'hub') or 'android'
    detail_id = get_query_param(handler.path, 'id')
    
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
    hub = get_query_param(handler.path, 'hub') or 'android'
    detail_id = get_query_param(handler.path, 'id')
    
    if not detail_id:
        handler.send_response(400)
        handler.end_headers()
        return

    data = get_post_data(handler)
    if not data:
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
