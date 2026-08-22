from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import date

class FilterValuesResponse(BaseModel):
    regions: List[str]
    segments: List[str]
    categories: List[str]
    sub_categories: List[str]
    years: List[int]
    states: List[str]
    products: List[str]
    customers: List[str]

class KPISummaryResponse(BaseModel):
    total_sales: float
    total_profit: float
    total_orders: int
    total_quantity: int
    profit_margin: float
    average_order_value: float

class TrendResponse(BaseModel):
    trends: List[Dict[str, Any]]

class RegionalAnalysisResponse(BaseModel):
    regions: List[Dict[str, Any]]

class CategoryAnalysisResponse(BaseModel):
    categories: List[Dict[str, Any]]

class SubCategoryAnalysisResponse(BaseModel):
    sub_categories: List[Dict[str, Any]]

class ProductAnalysisResponse(BaseModel):
    top_products: List[Dict[str, Any]]
    bottom_products: List[Dict[str, Any]]

class CustomerAnalysisResponse(BaseModel):
    top_customers: List[Dict[str, Any]]

class SegmentAnalysisResponse(BaseModel):
    segments: List[Dict[str, Any]]

class YearlyAnalysisResponse(BaseModel):
    yearly: List[Dict[str, Any]]

class DiscountAnalysisResponse(BaseModel):
    discount_impact: List[Dict[str, Any]]

class PaginatedDataResponse(BaseModel):
    items: List[Dict[str, Any]]
    total: int
    page: int
    limit: int
    total_pages: int

class DatasetProfileResponse(BaseModel):
    file_path: str
    file_name: str
    row_count: int
    column_count: int
    column_names: List[str]
    data_types: Dict[str, str]
    missing_values: Dict[str, int]
    duplicate_rows: int
    date_range: Optional[Dict[str, str]]
    categorical_columns: Dict[str, Any]
    numeric_columns: Dict[str, Any]
    identified_business_columns: Dict[str, Optional[str]]

class InsightResponse(BaseModel):
    title: str
    description: str
    type: str
    metric: Optional[str] = None
    value: Optional[str] = None
    recommendation: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    database: str
    app: str
    version: str
