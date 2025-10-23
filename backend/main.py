from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, tasks  # import both auth and tasks

app = FastAPI(title="Smart Task Manager Backend")

# ✅ Allow frontend (Vercel) to communicate with backend (Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # For testing — allows all origins
        # Later, you can replace "*" with your actual Vercel domain:
        # "https://smart-task-manager.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include authentication routes
app.include_router(auth.router, prefix="/auth")

# ✅ Include task management routes
app.include_router(tasks.router, prefix="/tasks")

@app.get("/")
def root():
    return {"message": "Smart Task Manager Backend is running!"}
