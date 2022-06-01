import { Injectable} from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filters: GetTasksFilterDto): Task[] {
  //   const { status, search } = filters;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // createTask(createTask: CreateTaskDto): Task {
  //   const { title, description } = createTask;
  //   const task = {
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //     id: uuid(),
  //   };
  //   this.tasks = [...this.tasks, task];
  //   return task;
  // }
  async getTasks(filterData: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterData, user);
  }
  async createTask(createTask: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTask, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status, user);
  }
  // deleteTask(id: string): void {
  //   const deletedTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
  // }
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
