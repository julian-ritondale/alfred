import type { Request, Response } from 'express';
import { TaskService } from './task.service.ts';
import type { CreateTaskDto, UpdateTaskDto } from './task.dto.ts';

const taskService = new TaskService();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await taskService.getTasks();
  res.status(200).json(tasks);
};

export const createTask = async (req: Request<{}, any, CreateTaskDto>, res: Response): Promise<void> => {
  const body = req.body;
  const newTask = await taskService.createTask(body);
  res.status(201).json(newTask);
};

export const updateTask = async (req: Request<{ id: string }, any, UpdateTaskDto>, res: Response): Promise<void> => {
  const { id } = req.params;
  const body = req.body;
  const updatedTask = await taskService.updateTask(id, body);
  res.status(200).json(updatedTask);
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  await taskService.deleteTask(id);
  res.status(204).send();
};
