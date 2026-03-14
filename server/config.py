import os

PORT = int(os.environ.get('PORT', 8080))
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
DATA_FILE = os.path.join(DATA_DIR, 'database.json')
QUESTIONS_FILE = os.path.join(DATA_DIR, 'questions.json')
CLIENT_DIR = os.path.join(os.path.dirname(__file__), '..', 'client')
