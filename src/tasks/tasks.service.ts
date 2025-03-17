import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus, UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(userId: number) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  getTaskById(id: number, userId: number) {
    const task = this.tasks.find(
      (task) => task.id === id && task.userId === userId,
    );
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, userId: number): Task {
    const task: Task = {
      ...createTaskDto,
      id: this.tasks.length + 1,
      status: TaskStatus.OPEN,
      userId,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId,
    );

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
    };

    return this.tasks[taskIndex];
  }

  deleteTask(id: number, userId: number) {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId,
    );

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);
  }

}
