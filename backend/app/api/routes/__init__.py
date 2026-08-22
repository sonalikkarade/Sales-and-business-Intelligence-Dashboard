from fastapi import APIRouter
from . import health, dashboard, analytics, filters, insights, export, data

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(filters.router, prefix="/filters", tags=["filters"])
api_router.include_router(insights.router, prefix="/insights", tags=["insights"])
api_router.include_router(export.router, prefix="/export", tags=["export"])
api_router.include_router(data.router, prefix="/data", tags=["data"])
