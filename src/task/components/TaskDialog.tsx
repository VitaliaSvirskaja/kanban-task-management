import { Dialog } from "@headlessui/react";
import { Close } from "../../components/icons/Close";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../model/Task";
import { UpdateTaskDto } from "../model/UpdateTaskDto";
import { NewSubTaskForm } from "../../subtask/components/NewSubTaskForm";
import { Delete } from "../../components/icons/Delete";
import { Subtask } from "../../subtask/components/Subtask";
import { useSubtasks } from "../../subtask/hooks/useSubtasks";
import { useTaskMutations } from "../hooks/useTaskMutations";
import { LoadingButton } from "../../components/LoadingButton";
import { DialogComponent } from "../../components/DialogComponent";

interface Props {
  boardColumnID: number;
  isOpen: boolean;
  onClose: () => void;
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
  boardColumnID,
  initialTaskValue,
  onDeleteTask,
}: Props) => {
  const subTasks = useSubtasks(initialTaskValue.id);

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

  const { updateTaskMutation } = useTaskMutations(boardColumnID);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateTaskDto: UpdateTaskDto = {
      boardColumnId: boardColumnID,
      title: data.taskName,
      description: data.description,
    };
    if (initialTaskValue?.id === undefined) {
      return;
    }
    await updateTaskMutation.mutateAsync({
      taskID: initialTaskValue.id,
      updateTaskDto: updateTaskDto,
    });
    reset();
    onClose();
  };

  return (
    <DialogComponent open={isOpen} onClose={onClose}>
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
                  taskID={initialTaskValue.id}
                />
              ))}
            </div>
          )}
          <NewSubTaskForm taskId={initialTaskValue.id} />
        </div>

        <div className=" flex w-full flex-col gap-3">
          <LoadingButton
            type="submit"
            variant="primary"
            size="small"
            text="Edit Task"
            isLoading={updateTaskMutation.isLoading}
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
    </DialogComponent>
  );
};
