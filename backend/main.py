from fastapi import FastAPI
from routes import auth

app = FastAPI(title="Smart Task Manager Backend")

# Include authentication routes
app.include_router(auth.router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Smart Task Manager Backend is running!"}
