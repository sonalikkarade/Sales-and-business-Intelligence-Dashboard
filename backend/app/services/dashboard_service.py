from app.database.repository import SalesRepository
from app.database.connection import SessionLocal
from typing import Dict, Any

class DashboardService:
    def get_summary(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_summary_kpis(filters)
        finally:
            db.close()
    
    def get_trends(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_trends(filters)
        finally:
            db.close()
