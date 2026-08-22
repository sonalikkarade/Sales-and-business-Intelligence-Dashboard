import pandas as pd
from datetime import datetime
from sqlalchemy.orm import Session
from app.database.connection import engine, Base, SessionLocal
from app.database.models import SalesData
from app.core.data_cleaner import DataCleaner
from app.core.dataset_inspector import DatasetInspector
from app.config import settings

class DatabaseSeeder:
    """Handles database initialization and data seeding."""
    
    def __init__(self):
        self.profile = None
        self.cleaned_df = None
        self.clean_summary = {}
    
    def inspect_dataset(self) -> dict:
        inspector = DatasetInspector(settings.CSV_PATH)
        profile = inspector.inspect()
        self.profile = profile
        return profile
    
    def initialize_database(self) -> dict:
        Base.metadata.create_all(bind=engine)
        return {'status': 'success', 'message': 'Database and tables created'}
    
    def seed_data(self) -> dict:
        if not self.profile:
            self.inspect_dataset()
        
        df = pd.read_csv(settings.CSV_PATH)
        cleaner = DataCleaner(df)
        self.cleaned_df, self.clean_summary = cleaner.clean()
        
        db = SessionLocal()
        try:
            from sqlalchemy import text
            db.execute(text("TRUNCATE TABLE sales_data"))
            db.commit()
            
            records = []
            for _, row in self.cleaned_df.iterrows():
                record = SalesData(
                    order_id=row.get('order_id', ''),
                    order_date=row.get('order_date') if pd.notna(row.get('order_date')) else None,
                    customer_name=row.get('customer_name', ''),
                    segment=row.get('segment', ''),
                    region=row.get('region', ''),
                    state=row.get('state', ''),
                    category=row.get('category', ''),
                    sub_category=row.get('sub_category', ''),
                    product_name=row.get('product_name', ''),
                    quantity=int(row.get('quantity', 0)) if pd.notna(row.get('quantity')) else 0,
                    discount=float(row.get('discount', 0)) if pd.notna(row.get('discount')) else 0.0,
                    sales=float(row.get('sales', 0)) if pd.notna(row.get('sales')) else 0.0,
                    profit=float(row.get('profit', 0)) if pd.notna(row.get('profit')) else 0.0,
                    year=int(row.get('year')) if pd.notna(row.get('year')) else None,
                    month=int(row.get('month')) if pd.notna(row.get('month')) else None,
                    quarter=str(row.get('quarter', '')) if pd.notna(row.get('quarter')) else '',
                    profit_margin=float(row.get('profit_margin', 0)) if pd.notna(row.get('profit_margin')) else 0.0,
                )
                records.append(record)
            
            db.bulk_save_objects(records)
            db.commit()
            count = len(records)
            
            return {
                'status': 'success',
                'records_imported': count,
                'dataset_profile': self.profile,
                'cleaning_summary': self.clean_summary,
            }
        except Exception as e:
            db.rollback()
            return {'status': 'error', 'message': str(e)}
        finally:
            db.close()
    
    def get_record_count(self) -> int:
        db = SessionLocal()
        try:
            return db.query(SalesData).count()
        finally:
            db.close()
