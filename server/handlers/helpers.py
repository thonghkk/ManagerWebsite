import urllib.parse
import os
from server.config import DATA_DIR

def get_hub_from_path(path):
    parsed = urllib.parse.urlparse(path)
    qs = urllib.parse.parse_qs(parsed.query)
    # Default to android if not provided
    return qs.get("hub", ["android"])[0]

def _ensure_hub_dir(hub):
    hub_dir = os.path.join(DATA_DIR, hub)
    os.makedirs(hub_dir, exist_ok=True)
    return hub_dir

def get_data_filepath(hub):
    hub_dir = _ensure_hub_dir(hub)
    return os.path.join(hub_dir, "database.json")

def get_questions_filepath(hub):
    hub_dir = _ensure_hub_dir(hub)
    return os.path.join(hub_dir, "questions.json")

def get_config_filepath(hub):
    hub_dir = _ensure_hub_dir(hub)
    return os.path.join(hub_dir, "config.json")
