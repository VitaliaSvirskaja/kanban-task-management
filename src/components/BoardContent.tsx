import { useContext, useEffect, useState } from "react";

import { boardContext } from "../context/BoardContext";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewColumnForm } from "./AddNewColumnForm";

export const BoardContent = () => {
  const { activeBoard } = useContext(boardContext);
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

  return (
    <div className="flex gap-4">
      {boardColumns.map((boardColumn) => {
        return <div key={boardColumn.id}>{boardColumn.title}</div>;
      })}
      <AddNewColumnForm onNewBoardColumn={handleNewBoardColumn} />
    </div>
  );
};
