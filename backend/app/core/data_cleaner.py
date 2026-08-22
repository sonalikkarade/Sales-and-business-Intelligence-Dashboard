import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, Any, List, Tuple
from app.core.column_mapper import ColumnMapper

class DataCleaner:
    """Professional data cleaning and validation."""
    
    def __init__(self, df: pd.DataFrame):
        self.original_df = df.copy()
        self.df = df.copy()
        self.summary = {
            'original_records': len(df),
            'final_records': len(df),
            'duplicates_removed': 0,
            'missing_value_summary': {},
            'business_columns': {},
            'date_range': {},
            'warnings': [],
            'processing_steps': [],
        }
    
    def clean(self) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        self._rename_columns()
        self._trim_strings()
        self._handle_duplicates()
        self._convert_dates()
        self._convert_numeric()
        self._handle_missing_values()
        self._validate_business_rules()
        self._create_derived_fields()
        
        self.summary['final_records'] = len(self.df)
        return self.df, self.summary
    
    def _rename_columns(self):
        self.df = ColumnMapper.rename_columns(self.df)
        self.summary['processing_steps'].append('Renamed columns to standardized names')
    
    def _trim_strings(self):
        str_cols = self.df.select_dtypes(include=['object']).columns
        for col in str_cols:
            self.df[col] = self.df[col].astype(str).str.strip()
        self.summary['processing_steps'].append('Trimmed whitespace from string columns')
    
    def _handle_duplicates(self):
        initial = len(self.df)
        self.df = self.df.drop_duplicates()
        removed = initial - len(self.df)
        self.summary['duplicates_removed'] = removed
        if removed > 0:
            self.summary['processing_steps'].append(f'Removed {removed} duplicate rows')
    
    def _convert_dates(self):
        date_cols = ColumnMapper.get_date_columns(self.df)
        for col in date_cols:
            self.df[col] = pd.to_datetime(self.df[col], errors='coerce')
        if date_cols:
            self.summary['processing_steps'].append('Converted date columns to datetime')
    
    def _convert_numeric(self):
        numeric_candidates = ['quantity', 'discount', 'sales', 'profit']
        for col in numeric_candidates:
            if col in self.df.columns:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')
        self.summary['processing_steps'].append('Converted numeric columns')
    
    def _handle_missing_values(self):
        missing = self.df.isnull().sum()
        self.summary['missing_value_summary'] = missing[missing > 0].to_dict()
        
        # Fill or drop based on column
        if 'sales' in self.df.columns:
            self.df['sales'] = self.df['sales'].fillna(0)
            self.summary['warnings'].append('Filled missing Sales values with 0')
        if 'profit' in self.df.columns:
            self.df['profit'] = self.df['profit'].fillna(0)
            self.summary['warnings'].append('Filled missing Profit values with 0')
        
        # Drop rows where critical fields are missing
        critical = ['order_id', 'order_date', 'customer_name', 'region', 'category']
        existing_critical = [c for c in critical if c in self.df.columns]
        if existing_critical:
            before = len(self.df)
            self.df = self.df.dropna(subset=existing_critical)
            dropped = before - len(self.df)
            if dropped > 0:
                self.summary['warnings'].append(f'Dropped {dropped} rows with missing critical fields')
    
    def _validate_business_rules(self):
        if 'sales' in self.df.columns:
            neg_sales = (self.df['sales'] < 0).sum()
            if neg_sales > 0:
                self.summary['warnings'].append(f'Found {neg_sales} records with negative Sales')
                self.df.loc[self.df['sales'] < 0, 'sales'] = 0
        
        if 'profit' in self.df.columns:
            neg_profit = (self.df['profit'] < 0).sum()
            if neg_profit > 0:
                self.summary['warnings'].append(f'Found {neg_profit} records with negative Profit (loss-making orders)')
        
        if 'discount' in self.df.columns:
            neg_discount = (self.df['discount'] < 0).sum()
            if neg_discount > 0:
                self.summary['warnings'].append(f'Found {neg_discount} records with negative Discount')
                self.df.loc[self.df['discount'] < 0, 'discount'] = 0
            
            high_discount = (self.df['discount'] > 1).sum()
            if high_discount > 0:
                self.summary['warnings'].append(f'Found {high_discount} records with Discount > 100%')
                self.df.loc[self.df['discount'] > 1, 'discount'] = 1
        
        if 'quantity' in self.df.columns:
            zero_qty = (self.df['quantity'] == 0).sum()
            if zero_qty > 0:
                self.summary['warnings'].append(f'Found {zero_qty} records with zero Quantity')
        
        self.summary['processing_steps'].append('Validated business rules')
    
    def _create_derived_fields(self):
        if 'order_date' in self.df.columns:
            self.df['order_date'] = pd.to_datetime(self.df['order_date'], errors='coerce')
            self.df['year'] = self.df['order_date'].dt.year
            self.df['month'] = self.df['order_date'].dt.month
            self.df['quarter'] = 'Q' + self.df['order_date'].dt.quarter.astype(str)
            self.summary['processing_steps'].append('Created year, month, quarter derived fields')
        
        if 'sales' in self.df.columns and 'profit' in self.df.columns:
            self.df['profit_margin'] = np.where(
                self.df['sales'] > 0,
                (self.df['profit'] / self.df['sales']) * 100,
                0
            )
            self.summary['processing_steps'].append('Created profit_margin derived field')
        
        self.summary['business_columns'] = ColumnMapper.get_business_columns(self.df)
        
        if 'order_date' in self.df.columns and not self.df['order_date'].isna().all():
            self.summary['date_range'] = {
                'min': str(self.df['order_date'].min()),
                'max': str(self.df['order_date'].max()),
            }
