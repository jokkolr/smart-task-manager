from fastapi import FastAPI
from routes import auth, tasks  # import both auth and tasks

app = FastAPI(title="Smart Task Manager Backend")

# Include authentication routes
app.include_router(auth.router, prefix="/auth")

# Include task management routes
app.include_router(tasks.router, prefix="/tasks")  # <-- added this

@app.get("/")
def root():
    return {"message": "Smart Task Manager Backend is running!"}
