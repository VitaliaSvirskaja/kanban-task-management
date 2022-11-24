import { ListElement } from "./ListElement";
import { Board as BoardIcon } from "./icons/Board";
import { Edit } from "./icons/Edit";
import { Add } from "./icons/Add";
import { ThemeSwitch } from "./ThemeSwitch";
import { useSelectedBoard } from "../board/context/SelectedBoardContext";
import { useBoards } from "../board/hooks/useBoards";
import { Board } from "../board/model/Board";
import { DialogComponent } from "./DialogComponent";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreateNewBoard: () => void;
  onEditBoard: (board: Board) => void;
}

export const MobileNavigationDialog = ({
  open,
  onClose,
  onCreateNewBoard,
  onEditBoard,
}: Props) => {
  const { selectBoard, selectedBoardID } = useSelectedBoard();
  const { data: boards } = useBoards();

  return (
    <DialogComponent open={open} onClose={onClose}>
      <div className="heading-s">ALL BOARDS ({boards?.length})</div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="-ml-6">
          {boards?.map((board) => (
            <ListElement
              key={board.id}
              icon={<BoardIcon />}
              text={board.title}
              className={`pl-6 ${
                selectedBoardID === board.id
                  ? "bg-primary text-white hover:text-primary focus:outline-2 focus:outline-primary-light dark:hover:bg-primary-light dark:hover:text-dark-grey"
                  : "text-medium-grey hover:text-primary dark:hover:text-primary-light"
              }`}
              onClick={() => selectBoard(board.id)}
              secondaryActionIcon={<Edit />}
              onSecondaryAction={() => onEditBoard(board)}
            />
          ))}

          <ListElement
            icon={<Add />}
            text="Create New Board"
            className="text-primary dark:text-primary-light"
            onClick={onCreateNewBoard}
          />
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </DialogComponent>
  );
};
