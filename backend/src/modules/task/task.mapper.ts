import type { Task } from './task.model.ts';
import type { TaskDto } from './task.dto.ts';

export class TaskMapper {
  toTaskDto(task: Task): TaskDto {
    const { updatedAt, ...dto } = task;
    return dto;
  }
}