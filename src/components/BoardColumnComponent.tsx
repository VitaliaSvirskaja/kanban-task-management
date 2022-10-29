import { useEffect, useState } from "react";
import { Task } from "../model/Task";
import { TaskDialog } from "./TaskDialog";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { AddNewTaskForm } from "./AddNewTaskForm";

interface Props {
  boardColumn: BoardColumn;
}

export const BoardColumnComponent = ({ boardColumn }: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState<Task | null>(null);

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
      <div className="heading-s overflow-hidden text-ellipsis py-3 px-1">{`${boardColumn.title.toUpperCase()} (${
        tasks.length
      })`}</div>
      <div className="flex h-fit flex-col gap-3">
        {tasks.map((task) => (
          <button
            className="heading-m w-full rounded-lg bg-white py-6 px-4 text-left shadow hover:text-primary focus:outline-2 focus:outline-primary"
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
