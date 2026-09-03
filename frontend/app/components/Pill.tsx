import { type LucideIcon } from "lucide-react";

interface PillProps {
  title: string;
  icon: LucideIcon;
}

export default function Pill({ title, icon: Icon }: PillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/50 px-2.5 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-800/80 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300">
      <Icon size={12} className="shrink-0 text-zinc-500" />
      {title}
    </span>
  );
}
