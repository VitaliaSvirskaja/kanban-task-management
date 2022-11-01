import { useContext, useEffect, useState } from "react";

import { boardContext } from "../context/BoardContext";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewColumnForm } from "./AddNewColumnForm";
import { BoardColumnComponent } from "./BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";
import { UpdateBoardColumnDto } from "../model/UpdateBoardColumnDto";

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

  async function handleBoardColumnTitleUpdate(
    boardColumnID: number,
    updatedBoardColumnTitle: string
  ) {
    if (activeBoard === null) {
      return;
    }
    const updateBoardColumnDto: UpdateBoardColumnDto = {
      boardId: activeBoard,
      title: updatedBoardColumnTitle,
    };
    const updatedBoardColumn = await API.updateColumn(
      boardColumnID,
      updateBoardColumnDto
    );
    const updatedBoardColumns = boardColumns.map((boardColumn) => {
      if (boardColumn.id === boardColumnID) {
        return updatedBoardColumn;
      } else {
        return boardColumn;
      }
    });
    setBoardColumns(updatedBoardColumns);
  }

  return (
    <div className="flex justify-items-start gap-6 p-8 dark:bg-very-dark-grey">
      {boardColumns.map((boardColumn) => (
        <BoardColumnComponent
          key={boardColumn.id}
          boardColumn={boardColumn}
          onTitleUpdate={(updatedBoardColumnTitle) => {
            handleBoardColumnTitleUpdate(
              boardColumn.id,
              updatedBoardColumnTitle
            );
          }}
        />
      ))}

      <AddNewColumnForm onNewBoardColumn={handleNewBoardColumn} />
    </div>
  );
};
