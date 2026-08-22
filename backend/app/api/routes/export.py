from fastapi import APIRouter, Depends, Response
from typing import Dict, Any
from app.services.export_service import ExportService
from app.schemas.dashboard import FilterValuesResponse

router = APIRouter()

def get_export_service():
    return ExportService()

@router.get("/csv")
def export_csv(
    year: str = "",
    region: str = "",
    category: str = "",
    sub_category: str = "",
    segment: str = "",
    state: str = "",
    start_date: str = "",
    end_date: str = "",
    service: ExportService = Depends(get_export_service)
):
    filters = {k: v for k, v in {
        'year': year, 'region': region, 'category': category,
        'sub_category': sub_category, 'segment': segment, 'state': state,
        'start_date': start_date, 'end_date': end_date,
    }.items() if v}
    
    csv_content = service.export_filtered_data_csv(filters)
    metadata = service.get_export_metadata(filters)
    
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={metadata['filename']}"}
    )
