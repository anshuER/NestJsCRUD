import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import Task, { TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskservice: TaskService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto):Task[] {
    if(Object.keys(filterDto).length)
    {
      return this.taskservice.getTaskWithFilters(filterDto)
    }
    else
    return this.taskservice.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskdto: CreateTaskDto): Task {
    return this.taskservice.createTask(createTaskdto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskservice.deleteTask(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskservice.updateTaskStatus(id, status); 
  }
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
