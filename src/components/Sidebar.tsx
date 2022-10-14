import { useContext } from "react";
import { boardContext } from "../context/BoardContext";
import { Board } from "./icons/Board";
import { ListElement } from "./ListElement";
import { Add } from "./icons/Add";
import { HideSidebar } from "./icons/HideSidebar";
import { ThemeSwitch } from "./ThemeSwitch";
import { Edit } from "./icons/Edit";

interface Props {
  isSidebarVisible: boolean;
  onClose: () => void;
  onCreateNewBoard: () => void;
}

export const Sidebar = ({
  isSidebarVisible,
  onClose,
  onCreateNewBoard,
}: Props) => {
  const { boards, selectBoard, activeBoard, deleteBoard } =
    useContext(boardContext);

  return (
    <aside
      className={`absolute top-0 left-0 z-30 flex h-full w-80 flex-col border-r border-r-lines-light bg-white pr-6 transition-transform ${
        isSidebarVisible ? "" : "-translate-x-full"
      }`}
    >
      <div className="heading-s py-4 pl-8">ALL BOARDS ({boards.length})</div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          {boards.map((board) => (
            <ListElement
              key={board.id}
              icon={<Board />}
              text={board.title}
              className={`${
                activeBoard === board.id
                  ? "bg-primary text-white hover:bg-primary focus:outline-2 focus:outline-primary-light"
                  : "text-medium-grey hover:text-primary "
              }`}
              onClick={() => selectBoard(board.id)}
              secondaryActionIcon={<Edit />}
              onSecondaryAction={() => deleteBoard(board.id)}
            />
          ))}

          <ListElement
            icon={<Add />}
            text="Create New Board"
            className="text-primary"
            onClick={onCreateNewBoard}
          />
        </div>
        <div>
          <ThemeSwitch />
          <ListElement
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
