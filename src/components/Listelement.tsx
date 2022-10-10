import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  text: string;
}

export const Listelement = ({
  icon,
  text,
  className,
  ...buttonProps
}: Props) => {
  return (
    <button
      className={`heading-m flex w-full list-none items-center gap-4 rounded-r-full py-5 pr-6 pl-8 transition-colors hover:bg-primary/10 ${className}`}
      {...buttonProps}
    >
      {icon}
      <p> {text}</p>
    </button>
  );
};
