import { AddNewColumnForm } from "../../boardColumn/components/AddNewColumnForm";
import { BoardColumnComponent } from "../../boardColumn/components/BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";
import { useBoards } from "../hooks/useBoards";
import { useBoardColumns } from "../../boardColumn/hooks/useBoardColumns";

interface Props {
  onAddNewBoard: () => void;
}

export const BoardContent = ({ onAddNewBoard }: Props) => {
  const boards = useBoards();
  const boardColumns = useBoardColumns();

  if (boards.length === 0) {
    return <NoExistingBoards onAddNewBoard={onAddNewBoard} />;
  }

  return (
    <div className="flex justify-items-start gap-6 p-8 dark:bg-very-dark-grey">
      {boardColumns.map((boardColumn) => (
        <BoardColumnComponent key={boardColumn.id} boardColumn={boardColumn} />
      ))}

      <AddNewColumnForm />
    </div>
  );
};
