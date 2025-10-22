import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const task = this.tasksService.createTask(title, description, userId);
    return { message: 'Task created successfully', task };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@Request() req: any) {
    const userId = req.user.userId;
    return this.tasksService.findAllByUser(userId);
  }
}
