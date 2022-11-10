import { useSelectedBoard } from "../context/SelectedBoardContext";
import { API } from "../../utils/API";
import { AddNewColumnForm } from "../../boardColumn/components/AddNewColumnForm";
import { BoardColumnComponent } from "../../boardColumn/components/BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";
import { useQuery } from "@tanstack/react-query";
import { useBoards } from "../hooks/useBoards";

interface Props {
  onAddNewBoard: () => void;
}

export const BoardContent = ({ onAddNewBoard }: Props) => {
  const { selectedBoardID } = useSelectedBoard();
  const boards = useBoards();

  const { data: boardColumns } = useQuery({
    queryKey: ["boardColumns", selectedBoardID],
    queryFn: () => {
      if (selectedBoardID) {
        return API.getColumns(selectedBoardID);
      }
    },
    enabled: selectedBoardID !== null,
  });

  if (boards.length === 0) {
    return <NoExistingBoards onAddNewBoard={onAddNewBoard} />;
  }

  return (
    <div className="flex justify-items-start gap-6 p-8 dark:bg-very-dark-grey">
      {boardColumns?.map((boardColumn) => (
        <BoardColumnComponent
          key={boardColumn.id}
          boardColumn={boardColumn}
          boardID={selectedBoardID}
        />
      ))}

      <AddNewColumnForm />
    </div>
  );
};
