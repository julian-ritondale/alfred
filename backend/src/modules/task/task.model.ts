export const TASK_STATUS = {
  UNASSIGNED: 'UNASSIGNED',
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export const TASK_PRIORITY = {
  UNASSIGNED: 'UNASSIGNED',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type TaskPriority = typeof TASK_PRIORITY[keyof typeof TASK_PRIORITY];

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