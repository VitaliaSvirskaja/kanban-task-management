import { AddNewColumnForm } from "../../boardColumn/components/AddNewColumnForm";
import { BoardColumnComponent } from "../../boardColumn/components/BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";
import { useBoards } from "../hooks/useBoards";
import { useBoardColumns } from "../../boardColumn/hooks/useBoardColumns";

interface Props {
  onAddNewBoard: () => void;
}

export const BoardContent = ({ onAddNewBoard }: Props) => {
  const { data: boards } = useBoards();
  const { data: boardColumns, isInitialLoading } = useBoardColumns();

  if (boards?.length === 0) {
    return <NoExistingBoards onAddNewBoard={onAddNewBoard} />;
  }

  return (
    <div className="flex justify-items-start gap-6 p-8 dark:bg-very-dark-grey">
      {isInitialLoading && (
        <div className="flex w-[250px] flex-col gap-3">
          <div className="my-3 h-4 animate-pulse rounded-full bg-gray-300" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
        </div>
      )}

      {boardColumns?.map((boardColumn) => (
        <BoardColumnComponent key={boardColumn.id} boardColumn={boardColumn} />
      ))}

      <AddNewColumnForm />
    </div>
  );
};
