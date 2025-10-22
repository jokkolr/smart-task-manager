from fastapi import APIRouter, HTTPException, Body

router = APIRouter()

# Temporary in-memory database
tasks_db = {}

# Add a new task
@router.post("/")
def add_task(username: str = Body(...), task: str = Body(...)):
    if username not in tasks_db:
        tasks_db[username] = []
    tasks_db[username].append({"task": task, "completed": False})
    return {"message": "Task added successfully", "tasks": tasks_db[username]}

# Get all tasks for a user
@router.get("/")
def get_tasks(username: str):
    return {"tasks": tasks_db.get(username, [])}

# Mark a task as complete
@router.post("/complete")
def complete_task(username: str = Body(...), index: int = Body(...)):
    if username not in tasks_db or index >= len(tasks_db[username]):
        raise HTTPException(status_code=400, detail="Invalid task index")
    tasks_db[username][index]["completed"] = True
    return {"message": "Task marked as complete", "tasks": tasks_db[username]}
