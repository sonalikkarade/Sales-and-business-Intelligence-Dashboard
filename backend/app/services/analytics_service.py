from app.database.repository import SalesRepository
from app.database.connection import SessionLocal
from typing import Dict, Any

class AnalyticsService:
    def get_regional_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_regional_analysis(filters)
        finally:
            db.close()
    
    def get_category_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_category_analysis(filters)
        finally:
            db.close()
    
    def get_sub_category_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_sub_category_analysis(filters)
        finally:
            db.close()
    
    def get_product_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            top = repo.get_product_analysis(filters, limit=10, bottom=False)
            bottom = repo.get_product_analysis(filters, limit=10, bottom=True)
            return {**top, **bottom}
        finally:
            db.close()
    
    def get_customer_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_customer_analysis(filters)
        finally:
            db.close()
    
    def get_segment_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_segment_analysis(filters)
        finally:
            db.close()
    
    def get_yearly_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_yearly_analysis(filters)
        finally:
            db.close()
    
    def get_discount_analysis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return repo.get_discount_analysis(filters)
        finally:
            db.close()
    
    def get_performance(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            return {
                'regional': repo.get_regional_analysis(filters),
                'category': repo.get_category_analysis(filters),
                'segment': repo.get_segment_analysis(filters),
                'yearly': repo.get_yearly_analysis(filters),
            }
        finally:
            db.close()
