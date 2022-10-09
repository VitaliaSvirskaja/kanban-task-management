import { useContext, useState } from "react";

import { Header } from "./components/Header";
import { boardContext } from "./context/BoardContext";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { boards, selectBoard, activeBoard } = useContext(boardContext);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="relative flex h-full">
        <aside
          className={`absolute top-0 left-0 h-full w-80 border-r border-r-lines-light transition-transform ${
            isSidebarVisible ? "" : "-translate-x-full"
          }`}
        >
          <div className="pl-8">All boards {boards.length}</div>
          <div>
            {boards.map((board) => {
              return (
                <li
                  key={board.id}
                  className={`mr-10 list-none pl-8 ${
                    activeBoard === board.id && "bg-primary"
                  }`}
                  onClick={() => selectBoard(board.id)}
                >
                  {board.title}
                </li>
              );
            })}
          </div>
        </aside>
        <main
          className={`w-full bg-light-grey transition-spacing ${
            isSidebarVisible ? "ml-80" : ""
          }`}
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          Content
        </main>
      </div>
    </div>
  );
};
