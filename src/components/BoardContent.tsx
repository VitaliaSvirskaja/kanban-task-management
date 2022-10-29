import { useContext, useEffect, useState } from "react";

import { boardContext } from "../context/BoardContext";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewColumnForm } from "./AddNewColumnForm";
import { BoardColumnComponent } from "./BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";

interface Props {
  onAddNewBoard: () => void;
}

export const BoardContent = ({ onAddNewBoard }: Props) => {
  const { activeBoard, boards } = useContext(boardContext);
  const [boardColumns, setBoardColumns] = useState<Array<BoardColumn>>([]);

  useEffect(() => {
    async function fetchBoardColumns() {
      if (activeBoard === null) {
        return;
      }
      const fetchedBoardColumns = await API.getColumns(activeBoard);
      setBoardColumns(fetchedBoardColumns);
    }

    fetchBoardColumns();
  }, [activeBoard]);

  function handleNewBoardColumn(createdBoardColumn: BoardColumn) {
    setBoardColumns([...boardColumns, createdBoardColumn]);
  }

  if (boards.length === 0) {
    return <NoExistingBoards onAddNewBoard={onAddNewBoard} />;
  }

  return (
    <div className="flex justify-items-start gap-6 p-8">
      {boardColumns.map((boardColumn) => (
        <BoardColumnComponent key={boardColumn.id} boardColumn={boardColumn} />
      ))}

      <AddNewColumnForm onNewBoardColumn={handleNewBoardColumn} />
    </div>
  );
};
