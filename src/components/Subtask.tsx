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
  const [editedSubtaskText, setEditedSubtaskText] = useState(subTask.text);

  async function handleSave() {
    const updateSubtaskDto: UpdateSubTaskDto = {
      text: editedSubtaskText,
      done: subTask.done,
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
        <div className="flex flex-col">
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
            onClick={handleSave}
            size="small"
          />
        </div>
      ) : (
        <div
          className="flex w-full justify-between"
          onClick={() => setIsEditing(true)}
        >
          {subTask.text}
          <button
            type="button" // prevent submit event of task dialog
            onClick={onDelete}
          >
            <Delete />
          </button>
        </div>
      )}
    </>
  );
};
