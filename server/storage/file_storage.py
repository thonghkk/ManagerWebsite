import json
import os
from .base import BaseStorage

class FileStorage(BaseStorage):
    def read(self, filepath: str):
        if not os.path.exists(filepath):
            return None
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)

    def write(self, filepath: str, data) -> bool:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
