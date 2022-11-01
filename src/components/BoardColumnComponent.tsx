import { useEffect, useState } from "react";
import { Task } from "../model/Task";
import { TaskDialog } from "./TaskDialog";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewTaskForm } from "./AddNewTaskForm";
import { Input } from "./Input";
import { Delete } from "./icons/Delete";

interface Props {
  boardColumn: BoardColumn;
  onTitleUpdate: (updatedBoardColumnTitle: string) => void;
  onDelete: () => void;
}

export const BoardColumnComponent = ({
  boardColumn,
  onTitleUpdate,
  onDelete,
}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task | null>(null);

  const [isEditingBoardColumnTitle, setIsEditingBoardColumnTitle] =
    useState(false);
  const [editedBoardColumnTitle, setEditedBoardColumnTitle] = useState(
    boardColumn.title
  );

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await API.getTasks(boardColumn.id);
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, [boardColumn.id]);

  function handleNewTask(createdTask: Task) {
    setTasks([...tasks, createdTask]);
  }

  function handleUpdatedTask(updatedTask: Task) {
    const updatedTasks: Array<Task> = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  async function handleDeleteTask(taskID: number) {
    await API.deleteTask(taskID);
    const updatedTasks: Array<Task> = tasks.filter(
      (task) => task.id !== taskID
    );
    setTasks(updatedTasks);
    setIsTaskDialogOpen(false);
  }

  return (
    <div className="flex w-full max-w-[250px] flex-col gap-3">
      {isEditingBoardColumnTitle ? (
        <Input
          autoFocus
          value={editedBoardColumnTitle}
          className="box-border h-10"
          onChange={(event) => setEditedBoardColumnTitle(event.target.value)}
          onBlur={() => {
            onTitleUpdate(editedBoardColumnTitle);
            setIsEditingBoardColumnTitle(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onTitleUpdate(editedBoardColumnTitle);
              setIsEditingBoardColumnTitle(false);
            }
          }}
        />
      ) : (
        <BoardColumnTitle
          title={boardColumn.title}
          taskCount={tasks.length}
          onClick={() => setIsEditingBoardColumnTitle(true)}
          onDelete={onDelete}
        />
      )}

      <div className="flex h-fit flex-col gap-3">
        {tasks.map((task) => (
          <button
            className="heading-m w-full rounded-lg bg-white py-6 px-4 text-left shadow hover:text-primary focus:outline-2 focus:outline-primary dark:bg-dark-grey dark:text-white"
            key={task.id}
            onClick={() => {
              setIsTaskDialogOpen(true);
              setTaskToBeUpdated(task);
            }}
          >{`${task.title}`}</button>
        ))}
      </div>
      <AddNewTaskForm
        boardColumnId={boardColumn.id}
        onNewTask={handleNewTask}
      />
      {taskToBeUpdated && (
        <TaskDialog
          boardColumnID={boardColumn.id}
          key={taskToBeUpdated.id}
          isOpen={isTaskDialogOpen}
          onClose={() => {
            setIsTaskDialogOpen(false);
            setTaskToBeUpdated(null);
          }}
          onUpdatedTask={handleUpdatedTask}
          initialTaskValue={taskToBeUpdated}
          onDeleteTask={() => handleDeleteTask(taskToBeUpdated.id)}
        />
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
