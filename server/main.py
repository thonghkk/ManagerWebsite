import http.server
import socketserver
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from server.config import PORT, CLIENT_DIR
from server.middleware.cors import CORSMixin
from server.storage.file_storage import FileStorage
from server.handlers.data_handler import handle_get_data, handle_post_data
from server.handlers.questions_handler import handle_get_questions, handle_post_questions
from server.handlers.hubs_handler import handle_get_hubs, handle_post_hubs
from server.handlers.details_handler import handle_get_details, handle_post_details
from server.handlers.tasks_handler import handle_get_tasks, handle_post_tasks, handle_put_tasks, handle_delete_tasks

storage = FileStorage()

class AppHandler(CORSMixin, http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=CLIENT_DIR, **kwargs)

    def end_headers(self):
        self.add_cors_headers()
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/data'):
            handle_get_data(self, storage)
        elif self.path.startswith('/api/questions'):
            handle_get_questions(self, storage)
        elif self.path.startswith('/api/hubs'):
            handle_get_hubs(self, storage)
        elif self.path.startswith('/api/details'):
            handle_get_details(self, storage)
        elif self.path.startswith('/api/tasks'):
            handle_get_tasks(self, storage)
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/data'):
            handle_post_data(self, storage)
        elif self.path.startswith('/api/questions'):
            handle_post_questions(self, storage)
        elif self.path.startswith('/api/hubs'):
            handle_post_hubs(self, storage)
        elif self.path.startswith('/api/details'):
            handle_post_details(self, storage)
        elif self.path.startswith('/api/tasks'):
            handle_post_tasks(self, storage)
        else:
            self.send_response(404)
            self.end_headers()

    def do_PUT(self):
        if self.path.startswith('/api/tasks'):
            handle_put_tasks(self, storage)
        else:
            self.send_response(404)
            self.end_headers()

    def do_DELETE(self):
        if self.path.startswith('/api/tasks'):
            handle_delete_tasks(self, storage)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    import socket
    def get_local_ip():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            # doesn't even have to be reachable
            s.connect(('8.8.8.8', 1))
            IP = s.getsockname()[0]
        except Exception:
            IP = '127.0.0.1'
        finally:
            s.close()
        return IP

    local_ip = get_local_ip()
    class ReusableTCPServer(socketserver.TCPServer):
        allow_reuse_address = True
        
    with ReusableTCPServer(("", PORT), AppHandler) as httpd:
        print(f"🚀 Server running locally on: http://localhost:{PORT}")
        if local_ip != '127.0.0.1':
            print(f"🌐 Server sharing on LAN:    http://{local_ip}:{PORT}")
        print(f"📁 Serving client from:      {CLIENT_DIR}")
        httpd.serve_forever()
