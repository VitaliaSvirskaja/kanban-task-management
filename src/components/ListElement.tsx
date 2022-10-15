import { ButtonHTMLAttributes, useState, MouseEvent } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  text: string;
  secondaryActionIcon?: JSX.Element;
  onSecondaryAction?: () => void;
}

export const ListElement = ({
  icon,
  text,
  secondaryActionIcon,
  onSecondaryAction,
  className,
  ...buttonProps
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  function handleSecondaryActionClick(event: MouseEvent) {
    event.stopPropagation();
    onSecondaryAction?.();
  }

  return (
    <button
      className={`heading-m flex w-full list-none items-center justify-between rounded-r-full py-5 pr-6 pl-8 transition-colors hover:bg-primary/10 focus:outline-2 focus:outline-primary ${className}`}
      {...buttonProps}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        {icon}
        <p>{text}</p>
      </div>
      <div onClick={handleSecondaryActionClick}>
        {isHovered && secondaryActionIcon}
      </div>
    </button>
  );
};
