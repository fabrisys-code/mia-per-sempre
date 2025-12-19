# -*- coding: utf-8 -*-
# Test User model

from app.core.database import SessionLocal
from app.models.user import User, UserType
from sqlalchemy import text

def test_user_model():
    """Test creating a user in the database"""
    db = SessionLocal()
    
    try:
        # Create test user
        test_user = User(
            email="test@example.com",
            password_hash="hashed_password_here",
            first_name="Mario",
            last_name="Rossi",
            phone="+39 333 1234567",
            user_type=UserType.PROPRIETARIO,
            email_verified=True
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        print(f"SUCCESS: User created: {test_user.full_name} (ID: {test_user.id})")
        print(f"   Email: {test_user.email}")
        print(f"   Type: {test_user.user_type}")
        print(f"   Created: {test_user.created_at}")
        
        # Query user back
        user = db.query(User).filter(User.email == "test@example.com").first()
        print(f"\nSUCCESS: User retrieved: {user.full_name}")
        
        # Count users
        count = db.query(User).count()
        print(f"SUCCESS: Total users in database: {count}")
        
        # Clean up - delete test user
        db.delete(test_user)
        db.commit()
        print(f"\nSUCCESS: Test user deleted")
        
    except Exception as e:
        print(f"ERROR: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_user_model()
