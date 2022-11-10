import { Delete } from "./icons/Delete";
import { SubTask } from "../model/SubTask";
import { useState } from "react";
import { Input } from "./Input";
import { API } from "./API";
import { UpdateSubTaskDto } from "../model/UpdateSubTaskDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  subTask: SubTask;
  taskID: number;
}

export const Subtask = ({ subTask, taskID }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [editedSubtaskText, setEditedSubtaskText] = useState(subTask.text);

  const queryClient = useQueryClient();
  const deleteSubTaskMutation = useMutation({
    mutationFn: API.deleteSubTask,
    onSuccess: (_data, deletedSubTaskID) => {
      queryClient.setQueryData(
        ["subTasks", taskID],
        (prevSubTasks?: Array<SubTask>) => {
          return prevSubTasks?.filter((prevSubTask) => {
            return prevSubTask.id !== deletedSubTaskID;
          });
        }
      );
    },
  });

  const updateSubTaskMutation = useMutation({
    mutationFn: (updateSubTaskDto: UpdateSubTaskDto) => {
      return API.updateSubTask(subTask.id, updateSubTaskDto);
    },
    onSuccess: (updatedSubTask) => {
      queryClient.setQueryData(
        ["subTasks", taskID],
        (prevSubtasks?: Array<SubTask>) => {
          return prevSubtasks?.map((prevSubtak) => {
            return prevSubtak.id === updatedSubTask.id
              ? updatedSubTask
              : prevSubtak;
          });
        }
      );
    },
  });

  async function handleSave(checked?: boolean) {
    const updateSubtaskDto: UpdateSubTaskDto = {
      text: editedSubtaskText,
      done: checked ?? subTask.done,
    };
    updateSubTaskMutation.mutate(updateSubtaskDto);
    setIsEditing(false);
  }

  return (
    <div
      className="flex h-11 w-full cursor-pointer items-center gap-4"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        type="checkbox"
        checked={subTask.done}
        className="h-4 w-4 cursor-pointer rounded text-primary transition-colors focus:border-none focus:ring-1 focus:ring-primary dark:bg-dark-grey dark:checked:bg-primary"
        onChange={(event) => handleSave(event.target.checked)}
      />
      {isEditing ? (
        <div className="flex h-11 w-full flex-col gap-2">
          <Input
            autoFocus
            type="text"
            value={editedSubtaskText}
            onChange={(event) => setEditedSubtaskText(event.target.value)}
            onBlur={() => {
              handleSave();
              setIsEditing(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSave();
              }
            }}
          />
        </div>
      ) : (
        <span
          className="w-full dark:text-white"
          onClick={() => {
            setIsEditing(true);
            setIsHovering(false);
          }}
        >
          {subTask.text}
        </span>
      )}
      {(isHovering || isEditing) && (
        <button
          type="button" // prevent submit event of task dialog
          onClick={() => deleteSubTaskMutation.mutate(subTask.id)}
          className="text-medium-grey"
        >
          <Delete />
        </button>
      )}
    </div>
  );
};
