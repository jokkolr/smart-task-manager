import { Injectable } from '@nestjs/common';

interface Task {
  id: number;
  title: string;
  description: string;
  userId: number;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(title: string, description: string, userId: number): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      userId,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAllByUser(userId: number): Task[] {
    return this.tasks.filter(task => task.userId === userId);
  }
}
