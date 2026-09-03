import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { createTask, updateTask } from "../../lib/api/task";
import { Task, TaskStatus, TaskPriority } from "../types/task";

interface TaskFormProps {
  onClose: () => void;
  onSaved: () => void;
  initialTask?: Task;
}

export default function TaskForm({ onClose, onSaved, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status || "UNASSIGNED");
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority || "UNASSIGNED");
  const [assignee, setAssignee] = useState(initialTask?.assignee || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setStatus(initialTask.status);
      setPriority(initialTask.priority);
      setAssignee(initialTask.assignee || "");
    }
  }, [initialTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        title,
        description: description || undefined,
        status,
        priority,
        assignee: assignee || undefined,
      };

      if (initialTask) {
        await updateTask(initialTask.id, payload);
      } else {
        await createTask(payload);
      }
      onSaved();
    } catch (error) {
      console.error("Failed to save task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!initialTask;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#121214] p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Task Name</label>
            <input
              type="text"
              placeholder="E.g. Redesign onboarding flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-colors focus:border-indigo-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus={!isEditing}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Description (optional)</label>
            <textarea
              placeholder="Add more details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-colors focus:border-indigo-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-400">Status</label>
              <div className="relative">
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 transition-colors focus:border-indigo-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="UNASSIGNED">Unassigned</option>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-400">Priority</label>
              <div className="relative">
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 transition-colors focus:border-indigo-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="UNASSIGNED">Unassigned</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-400">Assignee</label>
            <input
              type="text"
              placeholder="E.g. Julian"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 transition-colors focus:border-indigo-500 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#121214] disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
