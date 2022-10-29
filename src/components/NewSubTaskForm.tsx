import { Add } from "./icons/Add";
import { useRef, useState } from "react";
import { Input } from "./Input";
import { Close } from "./icons/Close";
import { useClickAwayListener } from "../hooks/useClickAwayListener";
import { API } from "./API";
import { CreateSubTaskDto } from "../model/CreateSubTaskDto";
import { SubTask } from "../model/SubTask";
import { Button } from "./Button";

interface Props {
  taskId: number;
  onNewSubTask: (createdSubTask: SubTask) => void;
}

export const NewSubTaskForm = ({ taskId, onNewSubTask }: Props) => {
  const [idAddingNewSubTask, setIsAddingNewSubTask] = useState(false);
  const [subTask, setSubTask] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useClickAwayListener(formRef, () => setIsAddingNewSubTask(false));

  async function handleSubmit() {
    if (subTask === "") {
      return;
    }
    const createSubTaskDto: CreateSubTaskDto = {
      taskId: taskId,
      text: subTask,
    };
    const createdSubTask: SubTask = await API.createSubTask(createSubTaskDto);
    onNewSubTask(createdSubTask);
    setSubTask("");
    setIsAddingNewSubTask(false);
  }

  return (
    <>
      {idAddingNewSubTask ? (
        <div
          ref={formRef}
          className="flex flex-col gap-2 rounded-lg bg-lines-light py-2 px-4"
        >
          <Input
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
          <div className="flex gap-2">
            <Button
              size="small"
              variant="secondary"
              text="Add New Subtask"
              icon={<Add />}
              onClick={handleSubmit}
              type="button" // prevent submit event of task dialog
            />

            <button type="reset" onClick={() => setIsAddingNewSubTask(false)}>
              <Close />
            </button>
          </div>
        </div>
      ) : (
        <Button
          size="small"
          variant="secondary"
          text="Add New Subtask"
          icon={<Add />}
          type="button" // prevent submit event of task dialog
          className="flex items-center"
          onClick={() => setIsAddingNewSubTask(true)}
        />
      )}
    </>
  );
};
