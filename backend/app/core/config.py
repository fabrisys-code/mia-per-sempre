# backend/app/core/config.py

from pydantic_settings import BaseSettings
from typing import List, Optional
from pydantic import field_validator


class Settings(BaseSettings):
    """
    Application settings from environment variables
    """
    
    # App Info
    APP_NAME: str = "Mia Per Sempre"
    APP_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "miapersempre"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    
    # Security
    SECRET_KEY: str
    JWT_SECRET_KEY: str  # Added
    JWT_ALGORITHM: str = "HS256"  # Added
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 20971520  # 20MB in bytes - Added
    UPLOAD_DIR: str = "../uploads"  # Added
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "ignore"  # IMPORTANTE: Ignora campi extra
    }
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS_ORIGINS string to list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    @property
    def is_development(self) -> bool:
        return self.DEBUG
    
    @property
    def database_url_sync(self) -> str:
        """Synchronous database URL for SQLAlchemy"""
        return self.DATABASE_URL


# Create settings instance
settings = Settings()
