# backend/app/api/endpoints/users.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_active_user
from app.models.user import User as UserModel
from app.schemas.user import User

router = APIRouter()


@router.get("/me", response_model=User)
def read_users_me(
    current_user: UserModel = Depends(get_current_active_user)
):
    """Get current user"""
    return current_user
