import { apiFetch } from "./client";
import {
  type CreateTaskDto,
  type SummarizeTaskResponse,
  type Task,
  type UpdateTaskDto,
} from "@/app/types/task";

export function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>("/api/tasks");
}

export function createTask(dto: CreateTaskDto): Promise<Task> {
  return apiFetch<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export function updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
  return apiFetch<Task>(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
}

export function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/api/tasks/${id}`, { method: "DELETE" });
}

export function summarizeTask(id: string): Promise<SummarizeTaskResponse> {
  return apiFetch<SummarizeTaskResponse>(`/api/tasks/${id}/summary`, {
    method: "POST",
  });
}
