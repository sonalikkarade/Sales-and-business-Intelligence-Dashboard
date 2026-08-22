from fastapi import APIRouter, Depends
from typing import Dict, Any
from app.database.repository import SalesRepository
from app.database.connection import SessionLocal
from app.schemas.dashboard import PaginatedDataResponse

router = APIRouter()

@router.get("/", response_model=PaginatedDataResponse)
def get_data(
    page: int = 1,
    limit: int = 25,
    search: str = "",
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
):
    db = SessionLocal()
    try:
        repo = SalesRepository(db)
        filters = {k: v for k, v in {
            'year': year, 'region': region, 'category': category,
            'sub_category': sub_category, 'segment': segment, 'state': state,
            'start_date': start_date, 'end_date': end_date,
        }.items() if v}
        return repo.get_paginated_data(filters, page=page, limit=limit, search=search)
    finally:
        db.close()
