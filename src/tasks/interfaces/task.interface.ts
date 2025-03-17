import { TaskStatus } from '../dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
  createdAt: Date;
}
