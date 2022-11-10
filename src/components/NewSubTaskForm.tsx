import { Add } from "./icons/Add";
import { useRef, useState } from "react";
import { Input } from "./Input";
import { useClickAwayListener } from "../hooks/useClickAwayListener";
import { API } from "./API";
import { CreateSubTaskDto } from "../model/CreateSubTaskDto";
import { SubTask } from "../model/SubTask";
import { Button } from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  taskId: number;
}

export const NewSubTaskForm = ({ taskId }: Props) => {
  const [idAddingNewSubTask, setIsAddingNewSubTask] = useState(false);
  const [subTask, setSubTask] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useClickAwayListener(formRef, () => setIsAddingNewSubTask(false));

  const queryClient = useQueryClient();
  const createSubTaskMutation = useMutation({
    mutationFn: API.createSubTask,
    onSuccess: (createdSubTask) => {
      queryClient.setQueryData(
        ["subTasks", taskId],
        (prevSubTasks?: Array<SubTask>) => [
          ...(prevSubTasks ?? []),
          createdSubTask,
        ]
      );
    },
  });

  async function handleSubmit() {
    if (subTask === "") {
      return;
    }
    const createSubTaskDto: CreateSubTaskDto = {
      taskId: taskId,
      text: subTask,
    };
    createSubTaskMutation.mutate(createSubTaskDto);
    setSubTask("");
    setIsAddingNewSubTask(false);
  }

  return (
    <>
      {idAddingNewSubTask ? (
        <div
          ref={formRef}
          className="flex w-full flex-col gap-2 rounded-lg py-2 dark:bg-dark-grey"
        >
          <Input
            label="New Subtask"
            value={subTask}
            onChange={(event) => setSubTask(event.target.value)}
            autoFocus
            className="rounded-lg"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // prevent submit event of task dialog
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-between gap-2">
            <Button
              size="small"
              variant="primary"
              text="Add New Subtask"
              icon={<Add />}
              onClick={handleSubmit}
              type="button" // prevent submit event of task dialog
            />

            <Button
              type="reset"
              text="Cancel"
              variant="secondary"
              size="small"
              onClick={() => setIsAddingNewSubTask(false)}
            />
          </div>
        </div>
      ) : (
        <Button
          size="small"
          variant="secondary"
          text="Add New Subtask"
          icon={<Add />}
          type="button" // prevent submit event of task dialog
          className="flex w-full items-center"
          onClick={() => setIsAddingNewSubTask(true)}
        />
      )}
    </>
  );
};
