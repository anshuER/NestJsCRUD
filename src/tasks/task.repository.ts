import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTask: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id, userId: user.id } });
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return task;
  }

  async getTasks(filterData: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterData;
    const query = this.createQueryBuilder('task').where(
      'task.userId = :userId',
      { userId: user.id },
    );

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    return task.save();
  }
  async userTasks(id: number, user: User): Promise<any> {
    const query = await this.createQueryBuilder('e')
      .where('e.userId=:id', { id })
      .getCount();
    const userRepo = getRepository(User);
    // const hg=await abc.createQueryBuilder('u').where('u.id = :id', { id }).select('u.username').getOne();
    const userWithCountedTasks = await userRepo
      .createQueryBuilder('u')
      .loadRelationCountAndMap('u.countTasks', 'u.tasks')
      .where('u.id = :id', { id })
      .getOne();
    console.log(userWithCountedTasks);
    return userWithCountedTasks;
    //return `Total Tasks By User of id:${id} = ${query}`;
  }
}
