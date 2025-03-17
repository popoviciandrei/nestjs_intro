import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { RequestUser } from 'src/auth/interfaces/requestUser.inteface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, TaskStatus } from './dto/update-task.dto';
import { ParseIntPipe } from 'src/shared/parse-int.pipe';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Request() req: RequestUser) {
    return this.tasksService.getAllTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(
    @Request() req: RequestUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.getTaskById(+id, req.user.id);
  }

  @Post()
  createTask(
    @Request() req: RequestUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(createTaskDto, req.user.id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: RequestUser,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user.id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Request() req: RequestUser,
  ) {
    return this.tasksService.updateTaskStatus(id, status, req.user.id);
  }

  @Delete(':id')
  deleteTask(
    @Request() req: RequestUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.deleteTask(id, req.user.id);
  }
}
