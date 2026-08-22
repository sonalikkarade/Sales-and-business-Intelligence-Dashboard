import pandas as pd
from typing import Dict, Any
from app.core.column_mapper import ColumnMapper

class DatasetInspector:
    """Inspects and profiles the actual dataset."""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.df = None
        self.profile = {}
    
    def inspect(self) -> Dict[str, Any]:
        self._load_csv()
        self._basic_stats()
        self._missing_values()
        self._duplicates()
        self._date_analysis()
        self._categorical_analysis()
        self._numeric_analysis()
        self._column_identification()
        return self.profile
    
    def _load_csv(self):
        self.df = pd.read_csv(self.csv_path)
        self.profile['file_path'] = self.csv_path
        self.profile['file_name'] = self.csv_path.split('/')[-1].split('\\')[-1]
    
    def _basic_stats(self):
        self.profile['row_count'] = len(self.df)
        self.profile['column_count'] = len(self.df.columns)
        self.profile['column_names'] = list(self.df.columns)
        self.profile['data_types'] = {col: str(dtype) for col, dtype in self.df.dtypes.items()}
    
    def _missing_values(self):
        missing = self.df.isnull().sum()
        self.profile['missing_values'] = {col: int(count) for col, count in missing.items() if count > 0}
    
    def _duplicates(self):
        self.profile['duplicate_rows'] = int(self.df.duplicated().sum())
    
    def _date_analysis(self):
        date_cols = ColumnMapper.get_date_columns(self.df)
        for col in date_cols:
            self.df[col] = pd.to_datetime(self.df[col], errors='coerce')
            valid_dates = self.df[col].dropna()
            if len(valid_dates) > 0:
                self.profile['date_range'] = {
                    'column': col,
                    'min': str(valid_dates.min()),
                    'max': str(valid_dates.max()),
                }
    
    def _categorical_analysis(self):
        cat_cols = ColumnMapper.get_categorical_columns(self.df)
        result = {}
        for col in cat_cols:
            unique_vals = self.df[col].dropna().unique()
            result[col] = {
                'unique_count': len(unique_vals),
                'unique_values': [str(v) for v in unique_vals[:50]],
            }
        self.profile['categorical_columns'] = result
    
    def _numeric_analysis(self):
        num_cols = ColumnMapper.get_numeric_columns(self.df)
        result = {}
        for col in num_cols:
            result[col] = {
                'min': float(self.df[col].min()),
                'max': float(self.df[col].max()),
                'mean': float(self.df[col].mean()),
                'median': float(self.df[col].median()),
                'std': float(self.df[col].std()),
            }
        self.profile['numeric_columns'] = result
    
    def _column_identification(self):
        business_cols = ColumnMapper.get_business_columns(self.df)
        identified = {}
        for key, val in business_cols.items():
            identified[key] = val
        self.profile['identified_business_columns'] = identified
