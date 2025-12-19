# Create database tables

from app.core.database import engine, Base
from app.models import User

print("Creating database tables...")

# Create all tables
Base.metadata.create_all(bind=engine)

print("SUCCESS: All tables created!")
print("\nTables created:")
for table in Base.metadata.sorted_tables:
    print(f"  - {table.name}")
