import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "small";
  variant?: "primary" | "secondary" | "destructive";
  text: string;
  icon?: JSX.Element;
}

export const Button = ({
  size = "large",
  variant = "primary",
  text,
  icon,
  className,
  ...buttonProps
}: Props) => (
  <button
    className={`heading-m flex w-full items-center justify-center gap-2 rounded-full px-6 transition-colors  focus:outline-2 focus:outline-primary disabled:opacity-40 ${
      variant === "primary"
        ? "bg-primary text-white hover:enabled:bg-primary-light dark:hover:bg-primary-light dark:hover:text-dark-grey"
        : variant === "secondary"
        ? "bg-primary bg-opacity-10 text-primary hover:enabled:bg-opacity-25 dark:bg-opacity-20 dark:text-primary-light dark:hover:bg-opacity-40"
        : variant === "destructive"
        ? "bg-red text-white hover:enabled:bg-red-light"
        : ""
    } ${size === "large" ? "py-4" : "py-3 text-[13px]"} ${className ?? ""}`}
    {...buttonProps}
  >
    {icon}
    <span>{text}</span>
  </button>
);
