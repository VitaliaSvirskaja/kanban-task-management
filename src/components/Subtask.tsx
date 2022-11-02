import { Delete } from "./icons/Delete";
import { SubTask } from "../model/SubTask";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { API } from "./API";
import { UpdateSubTaskDto } from "../model/UpdateSubTaskDto";

interface Props {
  subTask: SubTask;
  onUpdate: (updatedSubtask: SubTask) => void;
  onDelete: () => void;
}

export const Subtask = ({ subTask, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [editedSubtaskText, setEditedSubtaskText] = useState(subTask.text);

  async function handleSave(checked?: boolean) {
    const updateSubtaskDto: UpdateSubTaskDto = {
      text: editedSubtaskText,
      done: checked ?? subTask.done,
    };
    const updatedSubtask: SubTask = await API.updateSubTask(
      subTask.id,
      updateSubtaskDto
    );
    onUpdate(updatedSubtask);
    setIsEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <div className="flex w-full flex-col gap-2">
          <Input
            label="Edit Subtask"
            type="text"
            value={editedSubtaskText}
            onChange={(event) => setEditedSubtaskText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSave();
              }
            }}
          />
          <Button
            type="button" // prevent submit event of edit task dialog
            text="Save"
            onClick={() => handleSave()}
            size="small"
          />
        </div>
      ) : (
        <div
          className="flex w-full cursor-pointer items-center gap-4"
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <input
            type="checkbox"
            checked={subTask.done}
            className="h-5 w-5 cursor-pointer rounded text-primary transition-colors"
            onChange={(event) => handleSave(event.target.checked)}
          />
          <span className="w-full" onClick={() => setIsEditing(true)}>
            {subTask.text}
          </span>
          {isHovering && (
            <button
              type="button" // prevent submit event of task dialog
              onClick={onDelete}
            >
              <Delete />
            </button>
          )}
        </div>
      )}
    </>
  );
};
