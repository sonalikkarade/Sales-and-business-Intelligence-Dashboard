from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, desc, asc
from datetime import date
from app.database.models import SalesData
from app.database.connection import SessionLocal

class SalesRepository:
    """Repository for sales data analytics queries."""
    
    def __init__(self, db: Session):
        self.db = db
        self.model = SalesData
    
    def get_filter_values(self) -> Dict[str, List[str]]:
        result = {}
        result['regions'] = [r[0] for r in self.db.query(self.model.region).distinct().order_by(self.model.region).all() if r[0]]
        result['segments'] = [r[0] for r in self.db.query(self.model.segment).distinct().order_by(self.model.segment).all() if r[0]]
        result['categories'] = [r[0] for r in self.db.query(self.model.category).distinct().order_by(self.model.category).all() if r[0]]
        result['sub_categories'] = [r[0] for r in self.db.query(self.model.sub_category).distinct().order_by(self.model.sub_category).all() if r[0]]
        result['years'] = [r[0] for r in self.db.query(self.model.year).distinct().order_by(desc(self.model.year)).all() if r[0]]
        result['states'] = [r[0] for r in self.db.query(self.model.state).distinct().order_by(self.model.state).all() if r[0]]
        result['products'] = [r[0] for r in self.db.query(self.model.product_name).distinct().order_by(self.model.product_name).all() if r[0]]
        result['customers'] = [r[0] for r in self.db.query(self.model.customer_name).distinct().order_by(self.model.customer_name).all() if r[0]]
        return result
    
    def get_summary_kpis(self, filters: Dict[str, Any]) -> Dict[str, Any]:
        query = self.db.query(
            func.sum(self.model.sales).label('total_sales'),
            func.sum(self.model.profit).label('total_profit'),
            func.count(func.distinct(self.model.order_id)).label('total_orders'),
            func.sum(self.model.quantity).label('total_quantity'),
            func.avg(self.model.sales).label('avg_order_value'),
        )
        query = self._apply_filters(query, filters)
        result = query.first()
        
        total_sales = float(result.total_sales or 0)
        total_profit = float(result.total_profit or 0)
        total_orders = int(result.total_orders or 0)
        total_quantity = int(result.total_quantity or 0)
        avg_order_value = float(result.avg_order_value or 0)
        
        return {
            'total_sales': round(total_sales, 2),
            'total_profit': round(total_profit, 2),
            'total_orders': total_orders,
            'total_quantity': total_quantity,
            'profit_margin': round((total_profit / total_sales * 100) if total_sales > 0 else 0, 2),
            'average_order_value': round(avg_order_value, 2),
        }
    
    def get_trends(self, filters: Dict[str, Any], period: str = 'monthly') -> Dict[str, List[Dict]]:
        query = self.db.query(
            func.year(self.model.order_date).label('year'),
            func.month(self.model.order_date).label('month'),
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(func.year(self.model.order_date), func.month(self.model.order_date)).order_by(func.year(self.model.order_date), func.month(self.model.order_date))
        results = query.all()
        
        trends = []
        for row in results:
            trends.append({
                'year': int(row.year),
                'month': int(row.month),
                'label': f"{int(row.year)}-{int(row.month):02d}",
                'sales': round(float(row.sales or 0), 2),
                'profit': round(float(row.profit or 0), 2),
            })
        return {'trends': trends}
    
    def get_regional_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.region,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
            func.sum(self.model.quantity).label('quantity'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.region).order_by(desc(func.sum(self.model.sales)))
        results = query.all()
        
        return {
            'regions': [
                {
                    'name': row.region,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                    'quantity': int(row.quantity or 0),
                }
                for row in results
            ]
        }
    
    def get_category_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.category,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
            func.sum(self.model.quantity).label('quantity'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.category).order_by(desc(func.sum(self.model.sales)))
        results = query.all()
        
        return {
            'categories': [
                {
                    'name': row.category,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                    'quantity': int(row.quantity or 0),
                }
                for row in results
            ]
        }
    
    def get_sub_category_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.sub_category,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.sub_category).order_by(desc(func.sum(self.model.sales)))
        results = query.all()
        
        return {
            'sub_categories': [
                {
                    'name': row.sub_category,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                }
                for row in results
            ]
        }
    
    def get_product_analysis(self, filters: Dict[str, Any], limit: int = 10, bottom: bool = False) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.product_name,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
            func.sum(self.model.quantity).label('quantity'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.product_name)
        if bottom:
            query = query.order_by(asc(func.sum(self.model.sales)))
        else:
            query = query.order_by(desc(func.sum(self.model.sales)))
        query = query.limit(limit)
        results = query.all()
        
        key = 'bottom_products' if bottom else 'top_products'
        return {
            key: [
                {
                    'name': row.product_name,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                    'quantity': int(row.quantity or 0),
                }
                for row in results
            ]
        }
    
    def get_customer_analysis(self, filters: Dict[str, Any], limit: int = 10) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.customer_name,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.customer_name).order_by(desc(func.sum(self.model.sales))).limit(limit)
        results = query.all()
        
        return {
            'top_customers': [
                {
                    'name': row.customer_name,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                }
                for row in results
            ]
        }
    
    def get_segment_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.segment,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.segment).order_by(desc(func.sum(self.model.sales)))
        results = query.all()
        
        return {
            'segments': [
                {
                    'name': row.segment,
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                }
                for row in results
            ]
        }
    
    def get_yearly_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.year,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.year).order_by(self.model.year)
        results = query.all()
        
        return {
            'yearly': [
                {
                    'year': int(row.year),
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                }
                for row in results
            ]
        }
    
    def get_discount_analysis(self, filters: Dict[str, Any]) -> Dict[str, List[Dict]]:
        query = self.db.query(
            self.model.discount,
            func.sum(self.model.sales).label('sales'),
            func.sum(self.model.profit).label('profit'),
            func.count(func.distinct(self.model.order_id)).label('orders'),
        )
        query = self._apply_filters(query, filters)
        query = query.group_by(self.model.discount).order_by(self.model.discount)
        results = query.all()
        
        return {
            'discount_impact': [
                {
                    'discount': round(float(row.discount or 0), 2),
                    'sales': round(float(row.sales or 0), 2),
                    'profit': round(float(row.profit or 0), 2),
                    'orders': int(row.orders or 0),
                }
                for row in results
            ]
        }
    
    def get_paginated_data(self, filters: Dict[str, Any], page: int = 1, limit: int = 50, search: str = "") -> Dict[str, Any]:
        query = self.db.query(self.model)
        query = self._apply_filters(query, filters)
        
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                (self.model.order_id.ilike(search_pattern)) |
                (self.model.customer_name.ilike(search_pattern)) |
                (self.model.product_name.ilike(search_pattern)) |
                (self.model.state.ilike(search_pattern))
            )
        
        total = query.count()
        items = query.order_by(desc(self.model.order_date)).offset((page - 1) * limit).limit(limit).all()
        
        return {
            'items': [
                {
                    'order_id': row.order_id,
                    'order_date': str(row.order_date),
                    'customer_name': row.customer_name,
                    'segment': row.segment,
                    'region': row.region,
                    'state': row.state,
                    'category': row.category,
                    'sub_category': row.sub_category,
                    'product_name': row.product_name,
                    'quantity': row.quantity,
                    'discount': row.discount,
                    'sales': row.sales,
                    'profit': row.profit,
                }
                for row in items
            ],
            'total': total,
            'page': page,
            'limit': limit,
            'total_pages': (total + limit - 1) // limit,
        }
    
    def _apply_filters(self, query, filters: Dict[str, Any]):
        if filters.get('year'):
            query = query.filter(self.model.year == int(filters['year']))
        if filters.get('region'):
            query = query.filter(self.model.region == filters['region'])
        if filters.get('category'):
            query = query.filter(self.model.category == filters['category'])
        if filters.get('sub_category'):
            query = query.filter(self.model.sub_category == filters['sub_category'])
        if filters.get('segment'):
            query = query.filter(self.model.segment == filters['segment'])
        if filters.get('state'):
            query = query.filter(self.model.state == filters['state'])
        if filters.get('start_date'):
            query = query.filter(self.model.order_date >= filters['start_date'])
        if filters.get('end_date'):
            query = query.filter(self.model.order_date <= filters['end_date'])
        return query
