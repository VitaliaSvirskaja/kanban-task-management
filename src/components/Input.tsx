import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "filled";
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ error, label, variant, ...inputProps }, ref) => (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={inputProps.name} className="body-m text-medium-grey">
        {label}
      </label>
      <input
        placeholder="e.g. Web Design"
        ref={ref}
        {...inputProps}
        className={`rounded border border-2 border-medium-grey/25 py-3 px-3 outline-0 hover:border-none hover:ring-2 hover:ring-primary  focus:border-none focus:ring focus:ring-2 focus:ring-primary ${
          error === undefined
            ? "focus:ring-primary"
            : "ring-red-500 ring ring-2"
        }`}
      />

      <span className="text-red-600 pl-1">{error}</span>
    </div>
  )
);
