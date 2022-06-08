import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { applicationError } from 'src/err/custom-error';
import { ForbiddenException } from 'src/err/forbiden-exception';
import { HttpExceptionFilter } from 'src/err/http-exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filtersData: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filtersData, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() body: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(body, user);
  }

  @Get('/:id')
  @UseFilters(new HttpExceptionFilter())
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    // if(id!=1)
    // {
    //   applicationError(400, 'nooooo found');
    //   console.log('hello')
    // }
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    if (!id) {
      console.log('hello');
      throw new ForbiddenException();
    }
    return this.taskService.deleteTask(id, user);
  }
  @Patch('/:id/status')
  updateTask(
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(id, taskStatus, user);
  }

  @Get('/user/:id')
  userTasks(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.userTasks(id, user);
  }
}
