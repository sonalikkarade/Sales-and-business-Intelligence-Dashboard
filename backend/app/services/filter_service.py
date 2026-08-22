from typing import Dict, Any
from app.database.repository import SalesRepository
from app.database.connection import SessionLocal

class FilterService:
    def get_filter_values(self) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_filter_values()
        finally:
            db.close()
