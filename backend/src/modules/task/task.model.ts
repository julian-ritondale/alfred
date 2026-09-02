import { TaskStatus, TaskPriority } from '@prisma/client';

export { TaskStatus, TaskPriority };

export const TASK_STATUS = {
  UNASSIGNED: TaskStatus.UNASSIGNED,
  TODO: TaskStatus.TODO,
  IN_PROGRESS: TaskStatus.IN_PROGRESS,
  DONE: TaskStatus.DONE,
};

export const TASK_PRIORITY = {
  UNASSIGNED: TaskPriority.UNASSIGNED,
  LOW: TaskPriority.LOW,
  MEDIUM: TaskPriority.MEDIUM,
  HIGH: TaskPriority.HIGH,
};

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string | null;
  createdAt: Date;
  updatedAt: Date;
}