import {
  Controller,
  Get,
  Post,
  Put,
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
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Request() req: RequestUser) {
    return this.tasksService.getAllTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(@Request() req: RequestUser, @Param('id') id: string) {
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
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: RequestUser,
  ) {
    return this.tasksService.updateTaskStatus(+id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  deleteTask(@Request() req: RequestUser, @Param('id') id: string) {
    return this.tasksService.deleteTask(+id, req.user.id);
  }
}
