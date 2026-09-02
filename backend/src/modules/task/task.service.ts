import type { CreateTaskDto, UpdateTaskDto, TaskDto } from './task.dto.ts';
import { TaskRepository } from './task.repository.ts';
import { TaskMapper } from './task.mapper.ts';
import { NotFoundError } from '../../errors/index.ts';
import { AiClient } from '../ai/ai.client.ts';
import { buildSummaryPrompt } from './task.utils.ts';

const taskRepository = new TaskRepository();
const taskMapper = new TaskMapper();
const aiClient = new AiClient();

export class TaskService {
  async getTasks(): Promise<TaskDto[]> {
    const models = await taskRepository.getTasks();
    return models.map((m) => taskMapper.toTaskDto(m));
  }

  async createTask(dto: CreateTaskDto): Promise<TaskDto> {
    const model = await taskRepository.createTask(dto);
    return taskMapper.toTaskDto(model);
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<TaskDto> {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    const updated = await taskRepository.updateTask(id, dto);
    return taskMapper.toTaskDto(updated);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    await taskRepository.deleteTask(id);
  }

  async summarizeTask(id: string): Promise<string> {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    const taskDto = taskMapper.toTaskDto(task);
    const prompt = buildSummaryPrompt(taskDto);
    return aiClient.generateContent(prompt);
  }
}
