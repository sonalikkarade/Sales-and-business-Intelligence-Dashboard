from fastapi import APIRouter, Depends
from typing import Dict, Any, List
from app.services.insight_service import InsightService
from app.schemas.dashboard import InsightResponse

router = APIRouter()

def get_insight_service():
    return InsightService()

@router.get("/", response_model=List[InsightResponse])
def get_insights(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: InsightService = Depends(get_insight_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    return service.generate_insights(filters)
