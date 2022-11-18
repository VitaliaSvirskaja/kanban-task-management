import { useMemo } from "react";
import { useSelectedBoard } from "../context/SelectedBoardContext";
import { useBoards } from "./useBoards";

export function useActiveBoardName(): string {
  const { selectedBoardID } = useSelectedBoard();
  const { data: boards } = useBoards();
  return useMemo<string>(() => {
    const foundBoard = boards?.find((board) => board.id === selectedBoardID);
    return foundBoard?.title ?? "";
  }, [selectedBoardID, boards]);
}
