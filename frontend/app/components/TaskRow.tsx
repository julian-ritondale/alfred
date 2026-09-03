import { type ReactNode } from "react";

interface TaskRowProps {
  title: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function TaskRow({ title, onClick, children }: TaskRowProps) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between gap-4 rounded-lg px-4 py-2.5 transition-colors hover:bg-zinc-800/60 cursor-pointer"
    >
      <span className="text-sm font-medium text-zinc-200 truncate">{title}</span>
      {children && (
        <div className="flex shrink-0 items-center gap-1.5">{children}</div>
      )}
    </div>
  );
}
