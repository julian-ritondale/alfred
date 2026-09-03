"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Calendar, Tag, User } from "lucide-react";

import Button from "./components/Button";
import Pill from "./components/Pill";
import SearchBar from "./components/SearchBar";
import TaskRow from "./components/TaskRow";
import NewTaskForm from "./components/NewTaskForm";
import { getTasks } from "../lib/api/task";
import { Task } from "./types/task";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleTaskCreated = () => {
    setIsFormOpen(false);
    fetchTasks();
  };

  return (
    <div className="flex h-screen bg-[#0e0e11] font-sans dark:bg-[#0e0e11]">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 grid w-full grid-cols-3 items-center border-b border-zinc-800/40 bg-[#0e0e11]/80 px-8 py-4 backdrop-blur-md">
          <div className="text-sm text-zinc-100"></div>
          <div className="flex w-full items-center gap-3">
            <SearchBar />
            <Button onClick={() => setIsFormOpen(true)} />
          </div>
          <div></div>
        </header>
        <div className="flex flex-col gap-1 p-8">
          {isLoading ? (
            <div className="text-center text-zinc-500 py-10">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">No tasks found. Create one!</div>
          ) : (
            tasks.map((task) => (
              <TaskRow key={task.id} title={task.title}>
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
        {isFormOpen && <NewTaskForm onClose={() => setIsFormOpen(false)} onCreated={handleTaskCreated} />}
      </main>
    </div>
  );
}
