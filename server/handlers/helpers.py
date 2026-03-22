import urllib.parse
import os
from server.config import DATA_DIR

def get_hub_from_path(path):
    parsed = urllib.parse.urlparse(path)
    qs = urllib.parse.parse_qs(parsed.query)
    # Default to android if not provided
    return qs.get("hub", ["android"])[0]

def get_data_filepath(hub):
    return os.path.join(DATA_DIR, f"database_{hub}.json")

def get_questions_filepath(hub):
    return os.path.join(DATA_DIR, f"questions_{hub}.json")
