import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useActiveBoardName } from "../hooks/useActiveBoardName";
import { useThemeContext } from "../context/ThemeContext";

export const Header = () => {
  const activeBoardName = useActiveBoardName();
  const { isThemeDark } = useThemeContext();

  return (
    <header className="flex h-28">
      <div className="flex w-80 items-center border-r border-r-lines-light pl-8">
        <img src={isThemeDark ? logoLight : logoDark} alt="" />
      </div>
      <div className="flex flex-1 items-center justify-between px-8">
        <p className="heading-xl">{activeBoardName}</p>
      </div>
    </header>
  );
};
