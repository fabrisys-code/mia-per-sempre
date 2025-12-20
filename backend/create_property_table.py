# Create property table

from app.core.database import engine, Base
from app.models import Property, User

print("Creating property table...")

# Create all tables (crea solo quelle nuove)
Base.metadata.create_all(bind=engine)

print("SUCCESS: Property table created!")

# Verifica
from sqlalchemy import inspect
inspector = inspect(engine)
tables = inspector.get_table_names()
print(f"\nTables in database: {tables}")
