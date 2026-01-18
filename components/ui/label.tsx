import { cn } from "@/lib/utils";

interface LabelProps {
  label: string;
  className?: string;
  required?: boolean;
}
export function Label({ label, className = "", required = false }: LabelProps) {
  return (
    <label className={cn("block text-sm font-medium mb-1", className)}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
