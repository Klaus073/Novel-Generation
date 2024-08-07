"""
Model for taking payload.
"""
from pydantic import BaseModel


class Novel(BaseModel):
    """
    Base class for model Bot.
    """
    payload: dict
    session_id : str


