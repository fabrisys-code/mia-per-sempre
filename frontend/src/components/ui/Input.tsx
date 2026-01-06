import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, hint, leftIcon, rightIcon, id, ...props },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border px-4 py-3 transition-colors duration-200",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              error
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-gray-300 focus:border-primary-600 focus:ring-primary-200",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border px-4 py-3 transition-colors duration-200",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2",
            "min-h-[120px] resize-y",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-gray-300 focus:border-primary-600 focus:ring-primary-200",
            className
          )}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select component - supports both options prop and children
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, hint, options, placeholder, children, id, ...props },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border px-4 py-3 transition-colors duration-200",
            "focus:outline-none focus:ring-2",
            "appearance-none bg-white",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-gray-300 focus:border-primary-600 focus:ring-primary-200",
            className
          )}
          {...props}
        >
          {children ? (
            children
          ) : (
            <>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>

        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
