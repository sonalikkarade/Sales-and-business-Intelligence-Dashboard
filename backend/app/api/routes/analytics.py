from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.services.analytics_service import AnalyticsService
from app.schemas.dashboard import (
    RegionalAnalysisResponse,
    CategoryAnalysisResponse,
    SubCategoryAnalysisResponse,
    ProductAnalysisResponse,
    CustomerAnalysisResponse,
    SegmentAnalysisResponse,
    YearlyAnalysisResponse,
    DiscountAnalysisResponse,
)

router = APIRouter()

def get_analytics_service():
    return AnalyticsService()

@router.get("/regions", response_model=RegionalAnalysisResponse)
def get_regions(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_regional_analysis(filters)

@router.get("/categories", response_model=CategoryAnalysisResponse)
def get_categories(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_category_analysis(filters)

@router.get("/subcategories", response_model=SubCategoryAnalysisResponse)
def get_subcategories(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_sub_category_analysis(filters)

@router.get("/products", response_model=ProductAnalysisResponse)
def get_products(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_product_analysis(filters)

@router.get("/customers", response_model=CustomerAnalysisResponse)
def get_customers(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_customer_analysis(filters)

@router.get("/segments", response_model=SegmentAnalysisResponse)
def get_segments(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_segment_analysis(filters)

@router.get("/yearly", response_model=YearlyAnalysisResponse)
def get_yearly(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_yearly_analysis(filters)

@router.get("/discount", response_model=DiscountAnalysisResponse)
def get_discount(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_discount_analysis(filters)

@router.get("/performance")
def get_performance(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: AnalyticsService = Depends(get_analytics_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.get_performance(filters)
