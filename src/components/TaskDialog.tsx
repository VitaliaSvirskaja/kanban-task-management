import { Dialog } from "@headlessui/react";
import { Close } from "./icons/Close";
import { Input } from "./Input";
import { Button } from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "./API";
import { Task } from "../model/Task";
import { UpdateTaskDto } from "../model/UpdateTaskDto";
import { useEffect, useState } from "react";
import { NewSubTaskForm } from "./NewSubTaskForm";
import { SubTask } from "../model/SubTask";
import { Delete } from "./icons/Delete";
import { Subtask } from "./Subtask";

interface Props {
  boardColumnID: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdatedTask: (updatedTask: Task) => void;
  initialTaskValue: Task;
  onDeleteTask: () => void;
}

type Inputs = {
  taskName: string;
  description: string;
};

export const TaskDialog = ({
  isOpen,
  onClose,
  onUpdatedTask,
  boardColumnID,
  initialTaskValue,
  onDeleteTask,
}: Props) => {
  const [subTasks, setSubTasks] = useState<Array<SubTask>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      taskName: initialTaskValue.title,
      description: initialTaskValue.description,
    },
  });

  useEffect(() => {
    async function fetchSubTasks() {
      const fetchedSubTasks = await API.getSubTasks(initialTaskValue.id);
      setSubTasks(fetchedSubTasks);
    }
    fetchSubTasks();
  }, [initialTaskValue.id]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateTaskDto: UpdateTaskDto = {
      boardColumnId: boardColumnID,
      title: data.taskName,
      description: data.description,
    };
    if (initialTaskValue?.id === undefined) {
      return;
    }
    const updatedTask: Task = await API.updateTask(
      initialTaskValue?.id,
      updateTaskDto
    );
    onUpdatedTask(updatedTask);
    reset();
    onClose();
  };

  function handleNewSubTask(createdSubTask: SubTask) {
    setSubTasks([...subTasks, createdSubTask]);
  }

  async function handleDeleteSubtask(subTaskID: number) {
    await API.deleteSubTask(subTaskID);
    const updatedSubtasks: Array<SubTask> = subTasks.filter(
      (subTask) => subTask.id !== subTaskID
    );
    setSubTasks(updatedSubtasks);
  }

  function handleUpdateSubtask(updatedSubtask: SubTask) {
    const updatedSubtasks: Array<SubTask> = subTasks.map((subTask) =>
      subTask.id === updatedSubtask.id ? updatedSubtask : subTask
    );
    setSubTasks(updatedSubtasks);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-transform"
        aria-hidden="true"
      />
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded bg-white p-8 dark:bg-dark-grey">
          <div className="flex items-center justify-between">
            <Dialog.Title className="heading-l dark:text-white">
              Edit Task
            </Dialog.Title>
            <Close onClick={onClose} />
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-3 dark:text-white"
          >
            <Input
              label="Title"
              type="text"
              {...register("taskName", {
                validate: (input: string) => {
                  if (input === "") {
                    return "Can't be empty.";
                  }
                },
              })}
              error={errors.taskName?.message}
            />
            <label
              htmlFor="description"
              className="body-m text-medium-greybody-m text-medium-grey"
            >
              Description
            </label>
            <textarea
              className="body-l w-full resize-none rounded border border-2 border-medium-grey/25 py-2 px-3 outline-0 hover:border-primary focus:border-primary dark:bg-dark-grey"
              {...register("description")}
              rows={4}
            />
            {subTasks.map((subTask) => (
              <Subtask
                key={subTask.id}
                subTask={subTask}
                onUpdate={handleUpdateSubtask}
                onDelete={() => handleDeleteSubtask(subTask.id)}
              />
            ))}
            <NewSubTaskForm
              taskId={initialTaskValue.id}
              onNewSubTask={handleNewSubTask}
            />
            <div className=" flex w-full flex-col gap-3">
              {/* TODO: loading indicator while waiting for response */}
              <Button
                type="submit"
                variant="primary"
                size="small"
                text="Edit Task"
              />
              <Button
                type="button" // prevent submit event of task dialog
                variant="secondary"
                size="small"
                icon={<Delete />}
                text="Delete Task"
                onClick={onDeleteTask}
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
