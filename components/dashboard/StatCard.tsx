import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color,
  onClick,
  isActive = false,
}: StatCardProps) {
  return (
    <div className="group relative" onClick={onClick}>
      <Card
        className={`relative border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 ${onClick ? "cursor-pointer" : ""}`}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium uppercase mb-1 text-gray-500 dark:text-gray-400">
                {label}
              </p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h4>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-sm`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
