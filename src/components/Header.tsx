import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import logoMobile from "../assets/logo-mobile.svg";
import { useActiveBoardName } from "../board/hooks/useActiveBoardName";
import { useThemeContext } from "../context/ThemeContext";
import { ChevronDown } from "./icons/ChevronDown";
import { ChevronUp } from "./icons/ChevronUp";
import { useMobile } from "../hooks/useMobile";

interface Props {
  isVisible: boolean;
  onOpenNavigation: () => void;
}

export const Header = ({ isVisible, onOpenNavigation }: Props) => {
  const activeBoardName = useActiveBoardName();
  const { isThemeDark } = useThemeContext();

  const isMobile = useMobile();

  return (
    <header className="flex h-16 dark:bg-dark-grey sm:h-28">
      <div className="flex items-center border-r-lines-light px-4 dark:border-r-lines-dark sm:w-80 sm:border-r sm:pl-8">
        <img
          src={isMobile ? logoMobile : isThemeDark ? logoLight : logoDark}
          alt=""
        />
      </div>
      <div
        className="flex flex-1 items-center gap-3 dark:text-white sm:px-8"
        onClick={onOpenNavigation}
      >
        <p className="heading-l sm:heading-xl dark:text-white">
          {activeBoardName}
        </p>
        {isMobile && (isVisible ? <ChevronUp /> : <ChevronDown />)}
      </div>
    </header>
  );
};
