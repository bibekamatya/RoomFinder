import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import ErrorMessage from "./errorMessage";

interface SelectProps extends React.ComponentProps<"select"> {
  label?: string;
  options: { value: string; label: string }[] | string[];
  error?: string;
  placeholder?: string;
  labelClassName?: string;
}

function Select({
  label,
  options,
  error,
  placeholder,
  className,
  labelClassName = "",
  required,
  ...props
}: SelectProps) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt.toLowerCase(), label: opt } : opt
  );

  return (
    <div className="w-full">
      {label && <Label className={labelClassName} label={label} required={required} />}
      <select
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-md border border-input bg-white dark:bg-gray-800 px-3 py-2 text-sm shadow-sm",
          "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export { Select };
