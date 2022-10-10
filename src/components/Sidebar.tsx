import { useContext } from "react";
import { boardContext } from "../context/BoardContext";
import { Board } from "./icons/Board";
import { Listelement } from "./Listelement";
import { Add } from "./icons/Add";
import { HideSidebar } from "./icons/HideSidebar";

interface Props {
  isSidebarVisible: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isSidebarVisible, onClose }: Props) => {
  const { boards, selectBoard, activeBoard } = useContext(boardContext);

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

        <Listelement
          icon={<HideSidebar />}
          text="Hide Sidebar"
          className="mb-6 text-medium-grey hover:text-primary"
          onClick={onClose}
        />
      </div>
    </aside>
  );
};
