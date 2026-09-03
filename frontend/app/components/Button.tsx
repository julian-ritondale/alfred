import { Plus } from "lucide-react";

export default function Button({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-zinc-50 transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0e0e11]"
    >
      <Plus size={18} strokeWidth={2.5} />
    </button>
  );
}
