# Test database connection

from app.core.database import engine, SessionLocal
from app.core.config import settings
from sqlalchemy import text

def test_connection():
    """Test PostgreSQL connection"""
    print(f"Testing connection to: {settings.DATABASE_URL.split('@')[1]}")
    
    try:
        # Test engine connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print("SUCCESS: PostgreSQL connection successful!")
            print(f"Version: {version[:50]}...")
        
        # Test session
        db = SessionLocal()
        result = db.execute(text("SELECT current_database();"))
        db_name = result.fetchone()[0]
        print(f"SUCCESS: Current database: {db_name}")
        db.close()
        
        # Test PostGIS extension
        db = SessionLocal()
        result = db.execute(text("SELECT PostGIS_Version();"))
        postgis_version = result.fetchone()[0]
        print(f"SUCCESS: PostGIS extension: {postgis_version}")
        db.close()
        
        print("\nDatabase setup complete!")
        return True
        
    except Exception as e:
        print(f"ERROR: Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()
