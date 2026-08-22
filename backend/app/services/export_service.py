import csv
import io
from app.database.repository import SalesRepository
from app.database.connection import SessionLocal
from typing import Dict, Any

class ExportService:
    def export_filtered_data_csv(self, filters: Dict[str, Any]) -> str:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            data = repo.get_paginated_data(filters, page=1, limit=10000)
            
            output = io.StringIO()
            writer = csv.writer(output)
            
            headers = [
                'Order ID', 'Order Date', 'Customer Name', 'Segment', 'Region', 'State',
                'Category', 'Sub-Category', 'Product Name', 'Quantity', 'Discount',
                'Sales', 'Profit'
            ]
            writer.writerow(headers)
            
            for item in data['items']:
                writer.writerow([
                    item['order_id'],
                    item['order_date'],
                    item['customer_name'],
                    item['segment'],
                    item['region'],
                    item['state'],
                    item['category'],
                    item['sub_category'],
                    item['product_name'],
                    item['quantity'],
                    item['discount'],
                    item['sales'],
                    item['profit'],
                ])
            
            return output.getvalue()
        finally:
            db.close()
    
    def get_export_metadata(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        db = SessionLocal()
        try:
            repo = SalesRepository(db)
            data = repo.get_paginated_data(filters, page=1, limit=10000)
            return {
                'record_count': data['total'],
                'filename': f'sales_export_{__import__("datetime").datetime.now().strftime("%Y%m%d_%H%M%S")}.csv',
                'format': 'csv',
            }
        finally:
            db.close()
