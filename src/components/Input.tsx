import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ error, label, ...inputProps }, ref) => (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={inputProps.name} className="body-m text-medium-grey">
        {label}
      </label>
      <input
        placeholder="e.g. Web Design"
        ref={ref}
        {...inputProps}
        className={`rounded border border-2 border-medium-grey/25 py-2 px-3 outline-0 hover:border-primary focus:border-primary ${
          error === undefined ? "focus:border-primary" : "border-red-500"
        }`}
      />
      <span className="text-red-600 pl-1">{error}</span>
    </div>
  )
);

Input.displayName = "Input";
