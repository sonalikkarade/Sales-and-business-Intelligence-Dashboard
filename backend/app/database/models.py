from sqlalchemy import Column, String, Float, Integer, Date, Index
from sqlalchemy.sql import func
from app.database.connection import Base

class SalesData(Base):
    __tablename__ = "sales_data"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(String(50), nullable=False)
    order_date = Column(Date, nullable=False)
    customer_name = Column(String(255), nullable=False)
    segment = Column(String(100), nullable=False)
    region = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    sub_category = Column(String(100), nullable=False)
    product_name = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    discount = Column(Float, nullable=False, default=0.0)
    sales = Column(Float, nullable=True)
    profit = Column(Float, nullable=True)
    year = Column(Integer, nullable=True)
    month = Column(Integer, nullable=True)
    quarter = Column(String(10), nullable=True)
    profit_margin = Column(Float, nullable=True)
    created_at = Column(Date, server_default=func.curdate())
    
    __table_args__ = (
        Index('idx_order_date', 'order_date'),
        Index('idx_region', 'region'),
        Index('idx_category', 'category'),
        Index('idx_segment', 'segment'),
        Index('idx_product_name', 'product_name'),
        Index('idx_year', 'year'),
        Index('idx_month', 'month'),
        Index('idx_state', 'state'),
        Index('idx_sub_category', 'sub_category'),
    )
