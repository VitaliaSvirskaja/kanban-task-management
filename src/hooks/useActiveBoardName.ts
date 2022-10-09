import { useContext, useMemo } from "react";
import { boardContext } from "../context/BoardContext";

export function useActiveBoardName(): string {
  const { activeBoard, boards } = useContext(boardContext);
  return useMemo<string>(() => {
    const foundBoard = boards.find((board) => {
      return board.id === activeBoard;
    });
    return foundBoard?.title ?? "";
  }, [activeBoard, boards]);
}
