import { useReducer, useState } from "react";
import { TaskDialog } from "../../task/components/TaskDialog";
import { BoardColumn } from "../model/BoardColumn";
import { AddNewTaskForm } from "../../task/components/AddNewTaskForm";
import { Input } from "../../components/Input";
import { Delete } from "../../components/icons/Delete";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { TaskComponent } from "../../task/components/TaskComponent";
import { UpdateBoardColumnDto } from "../model/UpdateBoardColumnDto";
import { useTasks } from "../../task/hooks/useTasks";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";
import { useBoardColumnMutations } from "../hooks/useBoardColumnMutations";
import { useTaskMutations } from "../../task/hooks/useTaskMutations";
import { LoadingCircle } from "../../components/icons/LoadingCircle";
import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import { taskReducer } from "../../task/reducer/taskReducer";
import { useDrop } from "react-dnd";
import { Task } from "../../task/model/Task";

interface Props {
  boardColumn: BoardColumn;
}

export const BoardColumnComponent = ({ boardColumn }: Props) => {
  const { selectedBoardID } = useSelectedBoard();

  const { data: tasks, isInitialLoading } = useTasks(boardColumn.id);
  const [{ isConfirmDialogOpen, isDialogOpen, taskToBeUpdated }, dispatch] =
    useReducer(taskReducer, {
      isDialogOpen: false,
      isConfirmDialogOpen: false,
      taskToBeUpdated: null,
    });

  const [isEditingBoardColumnTitle, setIsEditingBoardColumnTitle] =
    useState(false);
  const [editedBoardColumnTitle, setEditedBoardColumnTitle] = useState(
    boardColumn.title
  );

  const queryClient = useQueryClient();

  const [hoveredTaskID, setHoveredTaskID] = useState<number | null>(null);
  const [{ isHovering }, dropRef] = useDrop({
    accept: "task",
    drop: async (task: Task) => {
      await updateTaskMutation.mutateAsync({
        taskID: task.id,
        updateTaskDto: {
          boardColumnId: boardColumn.id,
          title: task.title,
          description: task.description,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    hover: (item) => setHoveredTaskID(item.id),
    collect: (monitor) => ({ isHovering: monitor.isOver() }),
  });

  const { updateBoardColumnMutation, deleteBoardColumnMutation } =
    useBoardColumnMutations();

  const { deleteTaskMutation, updateTaskMutation } = useTaskMutations(
    boardColumn.id
  );

  function updateBoardColumn() {
    if (selectedBoardID === null) {
      return;
    }
    const updateBoardColumnDto: UpdateBoardColumnDto = {
      boardId: selectedBoardID,
      title: editedBoardColumnTitle,
    };
    updateBoardColumnMutation.mutate({
      boardColumID: boardColumn.id,
      updateBoardColumnDto: updateBoardColumnDto,
    });
    setIsEditingBoardColumnTitle(false);
  }

  async function handleDeleteTask(taskID: number) {
    await deleteTaskMutation.mutateAsync(taskID);
    dispatch({ type: "confirmTaskDelete" });
  }

  return (
    <div ref={dropRef} className="flex w-full max-w-[250px] flex-col gap-3">
      {isEditingBoardColumnTitle ? (
        <Input
          autoFocus
          value={editedBoardColumnTitle}
          className="box-border h-10"
          onChange={(event) => setEditedBoardColumnTitle(event.target.value)}
          onBlur={updateBoardColumn}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              updateBoardColumn();
            }
          }}
        />
      ) : (
        <BoardColumnTitle
          title={boardColumn.title}
          taskCount={tasks?.length ?? 0}
          onClick={() => setIsEditingBoardColumnTitle(true)}
          onDelete={() => deleteBoardColumnMutation.mutate(boardColumn.id)}
        />
      )}

      {isInitialLoading && (
        <>
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
          <div className="h-16 animate-pulse rounded-lg bg-gray-300" />
        </>
      )}

      {(tasks?.length ?? 0) > 0 && (
        <div className="flex h-fit flex-col gap-3">
          {tasks?.map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              onClick={() =>
                dispatch({ type: "selectTaskToBeUpdated", payload: task })
              }
            />
          ))}
        </div>
      )}

      {isHovering && !tasks?.find((task) => task.id === hoveredTaskID) && (
        <div className="h-16 rounded-lg bg-lines-light" />
      )}
      <AddNewTaskForm boardColumnId={boardColumn.id} />
      {taskToBeUpdated && (
        <>
          <TaskDialog
            boardColumnID={boardColumn.id}
            key={taskToBeUpdated.id}
            isOpen={isDialogOpen}
            onClose={() => dispatch({ type: "closeTaskDialog" })}
            initialTaskValue={taskToBeUpdated}
            onDeleteTask={() => dispatch({ type: "openDeleteTaskDialog" })}
          />
          <ConfirmationDialog
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${taskToBeUpdated.title}’ task and its subtasks? This action cannot be reversed.`}
            open={isConfirmDialogOpen}
            isLoading={deleteTaskMutation.isLoading}
            onClose={() => dispatch({ type: "closeConfirmation" })}
            onConfirm={() => handleDeleteTask(taskToBeUpdated.id)}
          />
        </>
      )}
    </div>
  );
};

interface BoardColumnTitleProps {
  title: string;
  taskCount: number;
  onClick: () => void;
  onDelete: () => void;
}

const BoardColumnTitle = ({
  title,
  taskCount,
  onClick,
  onDelete,
}: BoardColumnTitleProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const isDeletingBoardColumn = useIsMutating({
    mutationKey: ["deleteBoardColumn"],
  });

  return (
    <div
      className="flex items-center gap-4 pr-2 text-medium-grey"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="heading-s h-10 flex-1 cursor-pointer overflow-hidden text-ellipsis py-3 px-1"
        onClick={onClick}
      >{`${title.toUpperCase()} (${taskCount})`}</div>
      {isHovering && !isDeletingBoardColumn && (
        <button onClick={onDelete}>
          <Delete />
        </button>
      )}

      {!!isDeletingBoardColumn && <LoadingCircle />}
    </div>
  );
};
