import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import Task from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskservice: TaskService) {}
  @Get()
  getAllTasks() {
    return this.taskservice.getAllTasks();
  }
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ):Task {  
  //   console.log('title=', title);
  //   console.log('description=', description);
  //  return this.taskservice.createTask(title, description);
  // }
  @Post()
  createTask(
   @Body() createTaskdto:CreateTaskDto
  ):Task {  
   return this.taskservice.createTask(createTaskdto);
  }
}
