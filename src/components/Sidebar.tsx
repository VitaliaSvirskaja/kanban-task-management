import { useContext } from "react";
import { boardContext } from "../context/BoardContext";
import { Board as BoardIcon } from "./icons/Board";
import { ListElement } from "./ListElement";
import { Add } from "./icons/Add";
import { HideSidebar } from "./icons/HideSidebar";
import { ThemeSwitch } from "./ThemeSwitch";
import { Edit } from "./icons/Edit";
import { Board } from "../model/Board";

interface Props {
  isSidebarVisible: boolean;
  onClose: () => void;
  onCreateNewBoard: () => void;
  onEditBoard: (board: Board) => void;
}

export const Sidebar = ({
  isSidebarVisible,
  onClose,
  onCreateNewBoard,
  onEditBoard,
}: Props) => {
  const { boards, selectBoard, activeBoard } = useContext(boardContext);

  return (
    <aside
      className={`absolute top-0 left-0 z-30 flex h-full w-80 flex-col border-r border-r-lines-light bg-white pr-6 transition-transform dark:bg-dark-grey ${
        isSidebarVisible ? "" : "-translate-x-full"
      }`}
    >
      <div className="heading-s py-4 pl-8">ALL BOARDS ({boards.length})</div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          {boards.map((board) => (
            <ListElement
              key={board.id}
              icon={<BoardIcon />}
              text={board.title}
              className={`${
                activeBoard === board.id
                  ? "bg-primary text-white hover:text-primary focus:outline-2 focus:outline-primary-light dark:hover:bg-primary-light dark:hover:text-dark-grey"
                  : "text-medium-grey hover:text-primary dark:hover:text-primary-light"
              }`}
              onClick={() => selectBoard(board.id)}
              secondaryActionIcon={<Edit />}
              onSecondaryAction={() => onEditBoard(board)}
            />
          ))}

          <ListElement
            icon={<Add />}
            text="Create New Board"
            className="text-primary dark:text-primary-light"
            onClick={onCreateNewBoard}
          />
        </div>
        <div className="flex flex-col gap-2">
          <ThemeSwitch />
          <ListElement
            icon={<HideSidebar />}
            text="Hide Sidebar"
            className="mb-6 text-medium-grey hover:text-primary dark:hover:text-primary-light"
            onClick={onClose}
          />
        </div>
      </div>
    </aside>
  );
};
