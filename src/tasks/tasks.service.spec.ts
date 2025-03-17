import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './dto/update-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const task = service.createTask(
      {
        title: 'Test Task',
        description: 'Test Description',
      },
      1,
    );

    expect(task).toBeDefined();
  });

  describe('Other methods', () => {
    beforeEach(() => {
      service.createTask(
        {
          title: 'Test Task',
          description: 'Test Description',
        },
        1,
      );
    });
    it('should get all tasks', () => {
      const tasks = service.getAllTasks(1);

      expect(tasks).toBeDefined();
    });

    it('should get a task by id', () => {
      const task = service.getTaskById(1, 1);

      expect(task).toBeDefined();
    });

    it('should update a task', () => {
      const task = service.updateTaskStatus(
        1,
        {
          status: TaskStatus.IN_PROGRESS,
        } as UpdateTaskDto,
        1,
      );

      expect(task).toBeDefined();
    });

    it('should delete a task', () => {
      service.deleteTask(1, 1);

      const tasks = service.getAllTasks(1);

      expect(tasks.length).toBe(0);
    });
  });
});
