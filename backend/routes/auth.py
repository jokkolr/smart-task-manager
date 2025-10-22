from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Temporary in-memory database
users_db = {}

class User(BaseModel):
    username: str
    password: str

# Register route
@router.post("/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    users_db[user.username] = user.password
    return {"message": "User registered successfully"}

# Login route
@router.post("/login")
def login(user: User):
    if user.username not in users_db or users_db[user.username] != user.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful", "token": "fake-jwt-token"}
