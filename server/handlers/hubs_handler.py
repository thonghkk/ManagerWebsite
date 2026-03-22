import json
import os
from server.config import DATA_DIR
from server.handlers.helpers import get_config_filepath, _ensure_hub_dir

def handle_get_hubs(handler, storage):
    hubs = []
    # Scan data directory for hub folders
    if os.path.exists(DATA_DIR):
        for item in os.listdir(DATA_DIR):
            item_path = os.path.join(DATA_DIR, item)
            if os.path.isdir(item_path):
                config_path = os.path.join(item_path, "config.json")
                config_data = storage.read(config_path)
                if config_data:
                    hubs.append(config_data)

    handler.send_response(200)
    handler.send_header('Content-type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    handler.send_header('Pragma', 'no-cache')
    handler.send_header('Expires', '0')
    handler.end_headers()
    handler.wfile.write(json.dumps(hubs, ensure_ascii=False).encode('utf-8'))

def handle_post_hubs(handler, storage):
    content_length = int(handler.headers['Content-Length'])
    post_data = handler.rfile.read(content_length)
    try:
        hub_config = json.loads(post_data.decode('utf-8'))
        
        hub_id = hub_config.get("id")
        if not hub_id:
            raise ValueError("Hub ID is required")
            
        config_path = get_config_filepath(hub_id)
        storage.write(config_path, hub_config)
        
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success", "hub": hub_config}).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
