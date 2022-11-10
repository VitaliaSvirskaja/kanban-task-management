import { Add } from "../../components/icons/Add";
import { FormEvent, useRef, useState } from "react";
import { Input } from "../../components/Input";
import { Close } from "../../components/icons/Close";
import { useClickAwayListener } from "../../hooks/useClickAwayListener";
import { CreateTaskDto } from "../model/CreateTaskDto";
import { useTaskMutations } from "../hooks/useTaskMutations";

interface Props {
  boardColumnId: number;
}

// TODO: implement loading indicator
export const AddNewTaskForm = ({ boardColumnId }: Props) => {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useClickAwayListener(formRef, () => setIsAddingNewTask(false));

  const { createNewTaskMutation } = useTaskMutations(boardColumnId);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (taskTitle === "") {
      return;
    }
    const createTaskDto: CreateTaskDto = {
      boardColumnId: boardColumnId,
      title: taskTitle,
      description: "",
    };
    await createNewTaskMutation.mutateAsync(createTaskDto);
    setTaskTitle("");
    setIsAddingNewTask(false);
  }

  return (
    <>
      {isAddingNewTask ? (
        <form
          ref={formRef}
          className="flex flex-col gap-2 rounded-lg bg-lines-light py-2 px-4 dark:bg-dark-grey"
          onSubmit={handleSubmit}
        >
          <Input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            autoFocus
            className="rounded-lg"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="body-l rounded-lg bg-primary-light px-4 py-2 text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary-light dark:hover:text-dark-grey"
            >
              Add New Task
            </button>
            <button type="reset" onClick={() => setIsAddingNewTask(false)}>
              <Close />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingNewTask(true)}
          className="heading-s flex items-center gap-2 rounded-lg py-3 px-2 hover:text-primary focus:outline-2 focus:outline-primary"
        >
          <Add />
          <span>Add New Task</span>
        </button>
      )}
    </>
  );
};
