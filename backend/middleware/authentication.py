"""
authentication.py - Middleware for authentication.
"""
from typing import Annotated

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from utils.supabase_lib import supabase

security = HTTPBearer()


def authenticate(authorization: Annotated[str, Depends(security)], request: Request):
    """
    Function to authenticate user.
    """
    try:
        data = supabase.auth.get_user(authorization.credentials)
        request.state.user = (data.dict())["user"]
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials") from e

    return True
