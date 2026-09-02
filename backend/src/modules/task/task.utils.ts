import type { TaskDto } from './task.dto.ts';
import { SUMMARY_SYSTEM_PROMPT } from './prompts/summary.ts';

export const buildSummaryPrompt = (task: TaskDto): string => {
  return `${SUMMARY_SYSTEM_PROMPT}
Title: ${task.title}
Description: ${task.description || 'No description provided.'}
Status: ${task.status}
Priority: ${task.priority}
Assignee: ${task.assignee || 'Unassigned'}`;
};
