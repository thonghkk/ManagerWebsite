import json
import os
import time
from server.handlers.helpers import get_hub_from_path, get_tasks_filepath

def handle_get_tasks(handler, storage):
    hub = get_hub_from_path(handler.path)
    data_file = get_tasks_filepath(hub)
    data = storage.read(data_file)
    if data is None:
        data = []
    
    handler.send_response(200)
    handler.send_header('Content-type', 'application/json; charset=utf-8')
    handler.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    handler.send_header('Pragma', 'no-cache')
    handler.send_header('Expires', '0')
    handler.end_headers()
    handler.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

def handle_post_tasks(handler, storage):
    hub = get_hub_from_path(handler.path)
    data_file = get_tasks_filepath(hub)
    content_length = int(handler.headers['Content-Length'])
    post_data = handler.rfile.read(content_length)
    
    try:
        new_task = json.loads(post_data.decode('utf-8'))
        if 'id' not in new_task or not new_task['id']:
            new_task['id'] = str(int(time.time() * 1000))
            
        data = storage.read(data_file)
        if data is None:
            data = []
            
        data.append(new_task)
        storage.write(data_file, data)
        
        handler.send_response(201)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success", "task": new_task}, ensure_ascii=False).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))

def handle_put_tasks(handler, storage):
    hub = get_hub_from_path(handler.path)
    data_file = get_tasks_filepath(hub)
    
    # Extract task ID from path: /api/tasks/<id>?hub=...
    path_parts = handler.path.split('?')[0].split('/')
    task_id = path_parts[-1] if len(path_parts) > 3 and path_parts[-1] != 'tasks' else None
    
    content_length = int(handler.headers['Content-Length'])
    put_data = handler.rfile.read(content_length)
    
    try:
        updated_task_data = json.loads(put_data.decode('utf-8'))
        # Use ID from body if not in path
        if not task_id:
            task_id = updated_task_data.get('id')
            
        data = storage.read(data_file)
        if data is None:
            data = []
            
        task_found = False
        updated_task = None
        for i, task in enumerate(data):
            if task.get('id') == task_id:
                # Merge logic
                updated_task = {**task, **updated_task_data}
                updated_task['id'] = task_id # enforce ID
                data[i] = updated_task
                task_found = True
                break
                
        if not task_found:
            handler.send_response(404)
            handler.send_header('Content-type', 'application/json; charset=utf-8')
            handler.end_headers()
            handler.wfile.write(json.dumps({"status": "error", "message": "Task not found"}).encode('utf-8'))
            return

        storage.write(data_file, data)
        
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success", "task": updated_task}, ensure_ascii=False).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))

def handle_delete_tasks(handler, storage):
    hub = get_hub_from_path(handler.path)
    data_file = get_tasks_filepath(hub)
    
    # Extract task ID from path: /api/tasks/<id>?hub=...
    path_parts = handler.path.split('?')[0].split('/')
    task_id = path_parts[-1] if len(path_parts) > 3 and path_parts[-1] != 'tasks' else None
    
    if not task_id:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": "Task ID required"}).encode('utf-8'))
        return
        
    try:
        data = storage.read(data_file)
        if data is None:
            data = []
            
        initial_length = len(data)
        data = [t for t in data if t.get('id') != task_id]
        
        if len(data) == initial_length:
            handler.send_response(404)
            handler.send_header('Content-type', 'application/json; charset=utf-8')
            handler.end_headers()
            handler.wfile.write(json.dumps({"status": "error", "message": "Task not found"}).encode('utf-8'))
            return
            
        storage.write(data_file, data)
        
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
