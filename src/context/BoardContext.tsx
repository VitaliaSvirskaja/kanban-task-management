import React, { PropsWithChildren, useEffect, useState } from "react";
import { Board } from "../model/Board";

interface BoardContext {
  boards: Array<Board>;
  activeBoard: number | null;
  selectBoard: (boardID: number) => void;
}

export const boardContext = React.createContext<BoardContext>({
  boards: [
    { id: 1, title: "Platform Launch" },
    { id: 2, title: "Marketing Plan" },
    { id: 3, title: "Roadmap" },
  ],
  activeBoard: null,
  selectBoard: () => undefined,
});

export const BoardContextProvider = (props: PropsWithChildren) => {
  const [boards, setBoards] = useState<Array<Board>>([]);
  const [activeBoardID, setActiveBoardID] = useState<number | null>(null);

  function selectBoard(boardID: number) {
    setActiveBoardID(boardID);
    console.log(boardID);
  }

  useEffect(() => {
    async function fetchBoards() {
      //    TODO: implement backend data fetching
      const fetchedBoards: Array<Board> = [
        { id: 1, title: "Platform Launch" },
        { id: 2, title: "Marketing Plan" },
        { id: 3, title: "Roadmap" },
      ];
      setBoards(fetchedBoards);
      setActiveBoardID(fetchedBoards[0]?.id ?? null);
    }
    fetchBoards();
  }, []);

  return (
    <boardContext.Provider
      value={{
        boards: boards,
        activeBoard: activeBoardID,
        selectBoard: selectBoard,
      }}
    >
      {props.children}
    </boardContext.Provider>
  );
};
