import React, { PropsWithChildren, useEffect, useState } from "react";

import { Board } from "../model/Board";
import { CreateBoardDto } from "../model/CreateBoardDto";
import { API } from "../components/API";
import { UpdateBoardDto } from "../model/UpdateBoardDto";

interface BoardContext {
  boards: Array<Board>;
  activeBoard: number | null;
  selectBoard: (boardID: number) => void;
  createBoard: (createBoardDto: CreateBoardDto) => Promise<void>;
  updateBoard: (
    boardId: number,
    updateBoardDto: UpdateBoardDto
  ) => Promise<void>;
  deleteBoard: (boardID: number) => Promise<void>;
}

export const boardContext = React.createContext<BoardContext>({
  boards: [],
  activeBoard: null,
  selectBoard: () => undefined,
  createBoard: () => Promise.resolve(),
  updateBoard: () => Promise.resolve(),
  deleteBoard: () => Promise.resolve(),
});

export const BoardContextProvider = (props: PropsWithChildren) => {
  const [boards, setBoards] = useState<Array<Board>>([]);
  const [activeBoardID, setActiveBoardID] = useState<number | null>(null);

  useEffect(() => {
    async function initBoards() {
      const fetchedBoards = await API.fetchBoards();
      setBoards(fetchedBoards);
      setActiveBoardID(fetchedBoards[0]?.id ?? null);
    }
    initBoards();
  }, []);

  function selectBoard(boardID: number) {
    setActiveBoardID(boardID);
  }

  async function createBoard(createBoardDto: CreateBoardDto) {
    const createdBoard = await API.createBoard(createBoardDto);
    const updatedBoards: Array<Board> = [...boards, createdBoard];
    setBoards(updatedBoards);
    setActiveBoardID(createdBoard.id);
  }

  async function updateBoard(boardId: number, updateBoardDto: UpdateBoardDto) {
    const updatedBoard = await API.updateBoard(boardId, updateBoardDto);
    const updatedBoards: Array<Board> = boards.map((board) =>
      updatedBoard.id === board.id ? updatedBoard : board
    );
    setBoards(updatedBoards);
  }

  async function deleteBoard(boardID: number) {
    await API.deleteBoard(boardID);
    const updatedBoards: Array<Board> = boards.filter(
      (board) => board.id !== boardID
    );
    setBoards(updatedBoards);
    if (boardID === activeBoardID) {
      setActiveBoardID(updatedBoards[0]?.id ?? null);
    }
  }

  return (
    <boardContext.Provider
      value={{
        boards: boards,
        activeBoard: activeBoardID,
        selectBoard: selectBoard,
        createBoard: createBoard,
        updateBoard: updateBoard,
        deleteBoard: deleteBoard,
      }}
    >
      {props.children}
    </boardContext.Provider>
  );
};
