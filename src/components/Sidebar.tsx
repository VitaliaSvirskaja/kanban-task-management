import { useContext, useState } from "react";
import { boardContext } from "../context/BoardContext";
import { Board } from "./icons/Board";
import { Listelement } from "./Listelement";
import { Add } from "./icons/Add";
import { HideSidebar } from "./icons/HideSidebar";
import { Switch } from "@headlessui/react";
import { DarkTheme } from "./icons/DarkTheme";
import { LightTheme } from "./icons/LightTheme";

interface Props {
  isSidebarVisible: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isSidebarVisible, onClose }: Props) => {
  const { boards, selectBoard, activeBoard } = useContext(boardContext);
  const [isThemeDark, setIsThemeDark] = useState(false);

  return (
    <aside
      className={`absolute top-0 left-0 z-40 flex h-full w-80 flex-col border-r border-r-lines-light bg-white pr-6 transition-transform ${
        isSidebarVisible ? "" : "-translate-x-full"
      }`}
    >
      <div className="heading-s py-4 pl-8">ALL BOARDS ({boards.length})</div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          {boards.map((board) => (
            <Listelement
              key={board.id}
              icon={<Board />}
              text={board.title}
              className={`${
                activeBoard === board.id
                  ? "bg-primary text-white hover:bg-primary"
                  : "text-medium-grey hover:text-primary"
              }`}
              onClick={() => selectBoard(board.id)}
            />
          ))}

          <Listelement
            icon={<Add />}
            text="Create New Board"
            className="text-primary"
          />
        </div>
        <div>
          {/* TODO Als Komponente auslagern und Logik implementieren*/}
          <div
            className="ml-6 flex items-center justify-center gap-6
           rounded-lg bg-light-grey py-4"
          >
            <LightTheme />
            <Switch
              checked={isThemeDark}
              onChange={setIsThemeDark}
              className={`relative inline-flex h-6 w-11 items-center rounded-full bg-primary hover:bg-primary-light`}
            >
              <span
                className={`${
                  isThemeDark ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <DarkTheme />
          </div>

          <Listelement
            icon={<HideSidebar />}
            text="Hide Sidebar"
            className="mb-6 text-medium-grey hover:text-primary"
            onClick={onClose}
          />
        </div>
      </div>
    </aside>
  );
};
