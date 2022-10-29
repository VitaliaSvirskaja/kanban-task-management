import { LightTheme } from "./icons/LightTheme";
import { Switch } from "@headlessui/react";
import { DarkTheme } from "./icons/DarkTheme";
import { useThemeContext } from "../context/ThemeContext";

export const ThemeSwitch = () => {
  const { isThemeDark, toggleTheme } = useThemeContext();

  return (
    <div className="ml-6 flex items-center justify-center gap-6 rounded-lg bg-light-grey py-4 dark:bg-very-dark-grey">
      <LightTheme />
      <Switch
        checked={isThemeDark}
        onChange={toggleTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full bg-primary hover:bg-primary-light focus:outline-2 focus:outline-primary-light`}
      >
        <span
          className={`${
            isThemeDark ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <DarkTheme />
    </div>
  );
};
