import { useContext } from "react";
import { boardContext } from "../context/BoardContext";
import { Board } from "./icons/Board";
import { CreateNewBoard } from "./icons/CreateNewBoard";

interface Props {
isSidebarVisible:boolean
}

export const Sidebar = ({ isSidebarVisible }: Props) => {
  const { boards, selectBoard, activeBoard } = useContext(boardContext);
  return (
      <aside
        className={`absolute top-0 left-0 h-full w-80 pr-6 border-r border-r-lines-light transition-transform ${
          isSidebarVisible ? "" : "-translate-x-full"
        }`}
      >
        <div className="pl-8 py-4 heading-s">ALL BOARDS ({boards.length})</div>
        <div>
          {boards.map((board) => {
            return (
              // TODO: in eine Sidebar-Listelement-Komponente vereinheitlichen
              <button
                key={board.id}
                className={`hover:bg-primary/10 transition-colors heading-m w-full rounded-r-full list-none pl-8 py-5 flex gap-4 items-center ${
                  activeBoard === board.id ? "bg-primary text-white hover:bg-primary" : "text-medium-grey "
                }`}
                onClick={() => selectBoard(board.id)}
              >
                <Board className={`${
                  activeBoard === board.id ? "fill-white" : "fill-medium-grey "
                }`}/>
                {board.title}
              </button>
            );
          })}
        </div>
        <CreateNewBoard/>
      </aside>
  );
};


