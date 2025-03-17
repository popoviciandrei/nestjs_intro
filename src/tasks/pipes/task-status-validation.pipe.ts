import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../dto/update-task.dto';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(TaskStatus);

  transform(value: string) {
    if (!value) {
      throw new BadRequestException(`Task status cannot be empty`);
    }

    value = value.toUpperCase();

    if (!this.allowedStatuses.includes(value as TaskStatus)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
}
