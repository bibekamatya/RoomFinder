import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelClassName?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, labelClassName = "", required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <Label label={label} className={labelClassName} required={required} />}
        <textarea
          aria-invalid={!!error}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
