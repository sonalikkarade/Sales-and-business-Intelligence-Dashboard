import os
from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "sales_bi_platform"
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:5173"
    CSV_PATH: str = str(Path(__file__).resolve().parent.parent.parent / "sales_business_intelligence_dataset.csv")
    
    class Config:
        env_file = ".env"

settings = Settings()
