from abc import ABC, abstractmethod
from typing import Any

class BaseStorage(ABC):
    @abstractmethod
    def read(self, filepath: str) -> Any:
        pass

    @abstractmethod
    def write(self, filepath: str, data: Any) -> bool:
        pass
