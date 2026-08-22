from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.services.filter_service import FilterService
from app.schemas.dashboard import FilterValuesResponse

router = APIRouter()

def get_filter_service():
    return FilterService()

@router.get("/", response_model=FilterValuesResponse)
def get_filters(service: FilterService = Depends(get_filter_service)):
    return service.get_filter_values()
