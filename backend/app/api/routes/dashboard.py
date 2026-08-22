from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.database.connection import SessionLocal
from app.services.dashboard_service import DashboardService
from app.services.filter_service import FilterService
from app.schemas.dashboard import FilterValuesResponse, KPISummaryResponse, TrendResponse

router = APIRouter()

def get_filter_service():
    return FilterService()

def get_dashboard_service():
    return DashboardService()

@router.get("/filters", response_model=FilterValuesResponse)
def get_filters(service: FilterService = Depends(get_filter_service)):
    return service.get_filter_values()

@router.get("/summary", response_model=KPISummaryResponse)
def get_summary(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: DashboardService = Depends(get_dashboard_service)
):
    filters = {
        'year': year,
        'region': region,
        'category': category,
        'sub_category': sub_category,
        'segment': segment,
        'state': state,
        'start_date': start_date,
        'end_date': end_date,
    }
    filters = {k: v for k, v in filters.items() if v}
    return service.get_summary(filters)

@router.get("/trends", response_model=TrendResponse)
def get_trends(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: DashboardService = Depends(get_dashboard_service)
):
    filters = {
        'year': year,
        'region': region,
        'category': category,
        'sub_category': sub_category,
        'segment': segment,
        'state': state,
        'start_date': start_date,
        'end_date': end_date,
    }
    filters = {k: v for k, v in filters.items() if v}
    return service.get_trends(filters)
