import { Dialog } from "@headlessui/react";
import { Close } from "./icons/Close";
import { Input } from "./Input";
import { Button } from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "./API";
import { Task } from "../model/Task";
import { UpdateTaskDto } from "../model/UpdateTaskDto";
import { NewSubTaskForm } from "./NewSubTaskForm";
import { Delete } from "./icons/Delete";
import { Subtask } from "./Subtask";
import { useSubtasks } from "../hooks/useSubtasks";

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
  const {
    subTasks,
    handleNewSubTask,
    handleUpdateSubtask,
    handleDeleteSubtask,
  } = useSubtasks(initialTaskValue.id);

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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-transform"
        aria-hidden="true"
      />
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex max-h-[48rem] w-full max-w-md flex-col gap-6 overflow-y-auto rounded bg-white p-8 dark:bg-dark-grey">
          <div className="flex items-center justify-between">
            <Dialog.Title className="heading-l dark:text-white">
              Edit Task
            </Dialog.Title>
            <Close onClick={onClose} />
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-8 dark:text-white"
          >
            <div className="flex w-full flex-col gap-4">
              <div>
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
              </div>
              <div className="flex w-full flex-col">
                <label
                  htmlFor="description"
                  className="body-l w-full text-medium-grey"
                >
                  Description
                </label>
                <textarea
                  className="body-l  resize-none rounded border border-2 border-medium-grey/25 py-2 px-3 outline-0 hover:border-primary focus:border-primary dark:bg-dark-grey dark:text-white"
                  {...register("description")}
                  rows={4}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              {subTasks && (
                <div>
                  <span className="body-l text-medium-grey">Subtasks</span>

                  {subTasks.map((subTask) => (
                    <Subtask
                      key={subTask.id}
                      subTask={subTask}
                      onUpdate={handleUpdateSubtask}
                      onDelete={() => handleDeleteSubtask(subTask.id)}
                    />
                  ))}
                </div>
              )}
              <NewSubTaskForm
                taskId={initialTaskValue.id}
                onNewSubTask={handleNewSubTask}
              />
            </div>

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
