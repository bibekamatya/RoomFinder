import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  labelClassName?: string;
}

function Input({
  className,
  type,
  error,
  label = "",
  labelClassName = "",
  required,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <Label label={label} className={labelClassName} required={required} />
      )}
      <input
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

export { Input };
