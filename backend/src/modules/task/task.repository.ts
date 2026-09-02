import { prisma } from '../../lib/prisma.ts';
import type { CreateTaskDto, UpdateTaskDto } from './task.dto.ts';
import type { Task } from './task.model.ts';

export class TaskRepository {
  async getTasks(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return prisma.task.create({
      data: dto,
    });
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTask(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
