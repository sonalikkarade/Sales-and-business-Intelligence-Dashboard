from typing import Dict, List, Optional, Any
import pandas as pd

class ColumnMapper:
    """Maps actual CSV columns to internal standardized names."""
    
    # Actual dataset columns
    ACTUAL_COLUMNS = {
        'Order ID': 'order_id',
        'Order Date': 'order_date',
        'Customer Name': 'customer_name',
        'Segment': 'segment',
        'Region': 'region',
        'State': 'state',
        'Category': 'category',
        'Sub-Category': 'sub_category',
        'Product Name': 'product_name',
        'Quantity': 'quantity',
        'Discount': 'discount',
        'Sales': 'sales',
        'Profit': 'profit',
    }
    
    @classmethod
    def rename_columns(cls, df: pd.DataFrame) -> pd.DataFrame:
        df = df.copy()
        df.columns = [col.strip() for col in df.columns]
        df = df.rename(columns=cls.ACTUAL_COLUMNS)
        return df
    
    @classmethod
    def get_business_columns(cls, df: pd.DataFrame) -> Dict[str, Optional[str]]:
        cols = {col: col for col in df.columns}
        result = {
            'sales': cols.get('sales'),
            'profit': cols.get('profit'),
            'quantity': cols.get('quantity'),
            'order': cols.get('order_id'),
            'product': cols.get('product_name'),
            'customer': cols.get('customer_name'),
            'category': cols.get('category'),
            'sub_category': cols.get('sub_category'),
            'region': cols.get('region'),
            'segment': cols.get('segment'),
            'state': cols.get('state'),
            'date': cols.get('order_date'),
            'discount': cols.get('discount'),
        }
        return result
    
    @classmethod
    def get_numeric_columns(cls, df: pd.DataFrame) -> List[str]:
        return df.select_dtypes(include=['number']).columns.tolist()
    
    @classmethod
    def get_categorical_columns(cls, df: pd.DataFrame) -> List[str]:
        return df.select_dtypes(include=['object']).columns.tolist()
    
    @classmethod
    def get_date_columns(cls, df: pd.DataFrame) -> List[str]:
        date_cols = []
        for col in df.columns:
            if 'date' in col.lower():
                date_cols.append(col)
        return date_cols
