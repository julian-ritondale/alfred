import { type ReactNode } from "react";

interface TaskRowProps {
  title: string;
  children?: ReactNode;
}

export default function TaskRow({ title, children }: TaskRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg px-4 py-2.5 transition-colors hover:bg-zinc-800/60">
      <span className="text-sm font-medium text-zinc-200 truncate">{title}</span>
      {children && (
        <div className="flex shrink-0 items-center gap-1.5">{children}</div>
      )}
    </div>
  );
}
