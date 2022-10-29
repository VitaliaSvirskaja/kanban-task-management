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
        ref={ref}
        {...inputProps}
        className={`rounded border border-2 border-medium-grey/25 py-2 px-3 text-black outline-0 hover:border-primary focus:border-primary ${
          error === undefined ? "focus:border-primary" : "border-red"
        }`}
      />
      <span className="pl-1 text-xs text-red">{error}</span>
    </div>
  )
);

Input.displayName = "Input";
