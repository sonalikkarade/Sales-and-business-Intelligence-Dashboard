from fastapi import APIRouter
from sqlalchemy import text
from app.database.connection import SessionLocal
from app.schemas.dashboard import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
def health_check():
    db_status = "disconnected"
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    
    return HealthResponse(
        status="healthy",
        database=db_status,
        app="running",
        version="1.0.0"
    )
