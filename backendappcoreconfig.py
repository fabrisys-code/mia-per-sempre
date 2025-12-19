"""
Configurazione applicazione
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Settings from environment variables"""
    
    # App
    APP_NAME: str = "Mia Per Sempre API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str = "miapersempre"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    
    # JWT
    SECRET_KEY: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
