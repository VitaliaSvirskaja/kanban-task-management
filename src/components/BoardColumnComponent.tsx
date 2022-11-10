import { useState } from "react";
import { Task } from "../model/Task";
import { TaskDialog } from "./TaskDialog";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewTaskForm } from "./AddNewTaskForm";
import { Input } from "./Input";
import { Delete } from "./icons/Delete";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { TaskComponent } from "./TaskComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateBoardColumnDto } from "../model/UpdateBoardColumnDto";
import { useTasks } from "../hooks/useTasks";

interface Props {
  boardColumn: BoardColumn;
  boardID: number | null;
}

export const BoardColumnComponent = ({ boardColumn, boardID }: Props) => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task | null>(null);
  const tasks = useTasks(boardColumn.id);

  const [isEditingBoardColumnTitle, setIsEditingBoardColumnTitle] =
    useState(false);
  const [editedBoardColumnTitle, setEditedBoardColumnTitle] = useState(
    boardColumn.title
  );

  const queryClient = useQueryClient();
  const updateBoardColumnMutation = useMutation({
    mutationFn: (updateBoardColumnDto: UpdateBoardColumnDto) => {
      return API.updateColumn(boardColumn.id, updateBoardColumnDto);
    },
    onSuccess: (updatedBoardColumn) => {
      queryClient.setQueryData(
        ["boardColumns", boardID],
        (prevBoardColumns?: Array<BoardColumn>) => {
          return prevBoardColumns?.map((prevBoardColumn) => {
            return prevBoardColumn.id === updatedBoardColumn.id
              ? updatedBoardColumn
              : prevBoardColumn;
          });
        }
      );
    },
  });

  function updateBoardColumn() {
    if (boardID === null) {
      return;
    }
    const updateBoardColumnDto: UpdateBoardColumnDto = {
      boardId: boardID,
      title: editedBoardColumnTitle,
    };
    updateBoardColumnMutation.mutate(updateBoardColumnDto);
    setIsEditingBoardColumnTitle(false);
  }

  const deleteBoardColumnMutation = useMutation({
    mutationFn: API.deleteColumn,
    onSuccess: (_data, deletedBoardColumnID) => {
      queryClient.setQueryData(
        ["boardColumns", boardID],
        (prevBoardColumns?: Array<BoardColumn>) => {
          return prevBoardColumns?.filter((prevBoardColumn) => {
            return prevBoardColumn.id !== deletedBoardColumnID;
          });
        }
      );
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: API.deleteTask,
    onSuccess: (_data, deletedTaskID) => {
      queryClient.setQueryData(
        ["tasks", boardColumn.id],
        (prevTasks?: Array<Task>) => {
          return prevTasks?.filter((prevTask) => {
            return prevTask.id !== deletedTaskID;
          });
        }
      );
    },
  });

  async function handleDeleteTask(taskID: number) {
    deleteTaskMutation.mutate(taskID);
    setIsTaskDialogOpen(false);
    setIsConfirmDialogOpen(false);
  }

  return (
    <div className="flex w-full max-w-[250px] flex-col gap-3">
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
        <>
          {updateBoardColumnMutation.isLoading ||
          deleteBoardColumnMutation.isLoading ? (
            <div className="heading-s py-3 px-1 text-medium-grey">
              Loading...
            </div>
          ) : (
            <BoardColumnTitle
              title={boardColumn.title}
              taskCount={tasks.length}
              onClick={() => setIsEditingBoardColumnTitle(true)}
              onDelete={() => deleteBoardColumnMutation.mutate(boardColumn.id)}
            />
          )}
        </>
      )}

      {tasks.length > 0 && (
        <div className="flex h-fit flex-col gap-3">
          {tasks.map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              onClick={() => {
                setIsTaskDialogOpen(true);
                setTaskToBeUpdated(task);
              }}
            />
          ))}
        </div>
      )}
      <AddNewTaskForm boardColumnId={boardColumn.id} />
      {taskToBeUpdated && (
        <>
          <TaskDialog
            boardColumnID={boardColumn.id}
            key={taskToBeUpdated.id}
            isOpen={isTaskDialogOpen}
            onClose={() => {
              setIsTaskDialogOpen(false);
              setTaskToBeUpdated(null);
            }}
            initialTaskValue={taskToBeUpdated}
            onDeleteTask={() => {
              setIsConfirmDialogOpen(true);
              setIsTaskDialogOpen(false);
            }}
          />
          <ConfirmationDialog
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${taskToBeUpdated.title}’ task and its subtasks? This action cannot be reversed.`}
            open={isConfirmDialogOpen}
            onClose={() => {
              setIsTaskDialogOpen(true);
              setIsConfirmDialogOpen(false);
            }}
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
      {isHovering && (
        <button onClick={onDelete}>
          <Delete />
        </button>
      )}
    </div>
  );
};
