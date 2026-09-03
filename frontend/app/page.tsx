"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { AlertCircle, Tag, User, Filter } from "lucide-react";

import Button from "./components/Button";
import Pill from "./components/Pill";
import SearchBar from "./components/SearchBar";
import TaskRow from "./components/TaskRow";
import TaskForm from "./components/TaskForm";
import { getTasks } from "../lib/api/task";
import { Task, TaskStatus, TaskPriority } from "./types/task";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("ALL");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskSaved = () => {
    setIsFormOpen(false);
    setSelectedTask(undefined);
    fetchTasks();
  };

  const handleOpenCreate = () => {
    setSelectedTask(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(undefined);
  };

  const uniqueAssignees = useMemo(() => {
    const assignees = new Set<string>();
    tasks.forEach((t) => t.assignee && assignees.add(t.assignee));
    return Array.from(assignees);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (statusFilter !== "ALL" && task.status !== statusFilter) {
        return false;
      }
      if (priorityFilter !== "ALL" && task.priority !== priorityFilter) {
        return false;
      }
      if (assigneeFilter !== "ALL" && task.assignee !== assigneeFilter) {
        if (assigneeFilter === "UNASSIGNED" && task.assignee) {
           return false; // we can treat UNASSIGNED as a special filter if needed, but for now we just match exact strings. 
           // Wait, "UNASSIGNED" for assignee just means we only want unassigned tasks. If task.assignee is truthy, it fails.
        } else if (assigneeFilter !== "UNASSIGNED" && task.assignee !== assigneeFilter) {
           return false;
        }
      }
      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, assigneeFilter]);

  return (
    <div className="flex h-screen bg-[#0e0e11] font-sans dark:bg-[#0e0e11]">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 grid w-full grid-cols-3 items-center border-b border-zinc-800/40 bg-[#0e0e11]/80 px-8 py-4 backdrop-blur-md">
          <div className="text-sm text-zinc-100 font-semibold tracking-tight">Tasks</div>
          <div className="flex w-full items-center gap-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Button onClick={handleOpenCreate} />
          </div>
          <div></div>
        </header>
        <div className="flex justify-center mt-6 mb-2">
          <div className="flex items-center gap-4 px-6 py-2.5 rounded-2xl border border-zinc-800/60 bg-[#121214]/80 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm text-zinc-400 mr-2">
              <Filter size={14} />
              <span className="font-medium">Filters</span>
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer hover:bg-zinc-800/50 transition-colors"
            >
              <option className="bg-[#121214]" value="ALL">All Status</option>
              <option className="bg-[#121214]" value="UNASSIGNED">Unassigned</option>
              <option className="bg-[#121214]" value="TODO">To Do</option>
              <option className="bg-[#121214]" value="IN_PROGRESS">In Progress</option>
              <option className="bg-[#121214]" value="DONE">Done</option>
            </select>

            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer hover:bg-zinc-800/50 transition-colors"
            >
              <option className="bg-[#121214]" value="ALL">All Priority</option>
              <option className="bg-[#121214]" value="UNASSIGNED">Unassigned</option>
              <option className="bg-[#121214]" value="LOW">Low</option>
              <option className="bg-[#121214]" value="MEDIUM">Medium</option>
              <option className="bg-[#121214]" value="HIGH">High</option>
            </select>

            <select 
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-700 appearance-none cursor-pointer hover:bg-zinc-800/50 transition-colors"
            >
              <option className="bg-[#121214]" value="ALL">All Assignees</option>
              <option className="bg-[#121214]" value="UNASSIGNED">Unassigned</option>
              {uniqueAssignees.map(a => (
                <option className="bg-[#121214]" key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-8">
          {isLoading ? (
            <div className="text-center text-zinc-500 py-10">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">
              {tasks.length === 0 ? "No tasks found. Create one!" : "No tasks match your filters."}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskRow 
                key={task.id} 
                title={task.title}
                onClick={() => handleOpenEdit(task)}
              >
                {task.priority !== "UNASSIGNED" && (
                  <Pill title={task.priority} icon={AlertCircle} />
                )}
                {task.status !== "UNASSIGNED" && (
                  <Pill title={task.status} icon={Tag} />
                )}
                {task.assignee && (
                  <Pill title={task.assignee} icon={User} />
                )}
              </TaskRow>
            ))
          )}
        </div>
        {isFormOpen && (
          <TaskForm 
            onClose={handleCloseForm} 
            onSaved={handleTaskSaved} 
            initialTask={selectedTask}
          />
        )}
      </main>
    </div>
  );
}
