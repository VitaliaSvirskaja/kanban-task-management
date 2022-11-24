import { AddNewColumnForm } from "../../boardColumn/components/AddNewColumnForm";
import { BoardColumnComponent } from "../../boardColumn/components/BoardColumnComponent";
import { NoExistingBoards } from "./NoExistingBoards";
import { useBoards } from "../hooks/useBoards";
import { useBoardColumns } from "../../boardColumn/hooks/useBoardColumns";
import { useDragLayer } from "react-dnd";
import { Task } from "../../task/model/Task";
import { TaskComponent } from "../../task/components/TaskComponent";
import { useMobile } from "../../hooks/useMobile";

const TASK_CARD_HEIGHT = 67;
const HORIZONTAL_SCROLL_PADDING_OFFSET = 16;

interface Props {
  onAddNewBoard: () => void;
}

export const BoardContent = ({ onAddNewBoard }: Props) => {
  const { data: boards } = useBoards();
  const { data: boardColumns, isInitialLoading } = useBoardColumns();

  const isMobile = useMobile();
  const { isDragging, item, offsetY, offsetX } = useDragLayer((monitor) => {
    return {
      isDragging: monitor.isDragging(),
      item: monitor.getItem<Task>(),
      offsetY:
        (monitor.getInitialSourceClientOffset()?.y ?? 0) +
        (monitor.getDifferenceFromInitialOffset()?.y ?? 0) -
        TASK_CARD_HEIGHT,
      offsetX:
        (monitor.getInitialSourceClientOffset()?.x ?? 0) +
        (monitor.getDifferenceFromInitialOffset()?.x ?? 0) +
        HORIZONTAL_SCROLL_PADDING_OFFSET,
    };
  });

  if (boards?.length === 0) {
    return <NoExistingBoards onAddNewBoard={onAddNewBoard} />;
  }

  return (
    <div className="relative flex h-full snap-x scroll-pl-4 justify-items-start gap-6 overflow-x-scroll p-8 dark:bg-very-dark-grey">
      {isInitialLoading && (
        <div className="flex w-[250px] flex-col gap-3">
          <div className="my-3 h-4 animate-pulse rounded-full bg-gray-300 dark:bg-dark-grey" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300 dark:bg-dark-grey" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300 dark:bg-dark-grey" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300 dark:bg-dark-grey" />
        </div>
      )}

      {boardColumns?.map((boardColumn) => (
        <BoardColumnComponent key={boardColumn.id} boardColumn={boardColumn} />
      ))}

      {isMobile && isDragging && (
        <div
          className={`pointer-events-none absolute min-w-[250px] max-w-[250px]`}
          style={{
            top: offsetY,
            left: offsetX,
          }}
        >
          <TaskComponent task={item} onClick={() => undefined} />
        </div>
      )}

      <AddNewColumnForm />
    </div>
  );
};
