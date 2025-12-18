from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Carica variabili ambiente
load_dotenv()

# Crea app FastAPI
app = FastAPI(
    title=os.getenv("APP_NAME", "Mia Per Sempre API"),
    version=os.getenv("APP_VERSION", "0.1.0"),
    description="API per marketplace nuda proprietà",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "Mia Per Sempre API",
        "version": os.getenv("APP_VERSION", "0.1.0"),
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )