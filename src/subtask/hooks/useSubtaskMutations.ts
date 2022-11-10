import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { SubTask } from "../model/SubTask";
import { UpdateSubTaskDto } from "../model/UpdateSubTaskDto";

export function useSubtaskMutations(taskID: number) {
  const queryClient = useQueryClient();

  const createSubTaskMutation = useMutation({
    mutationFn: API.createSubTask,
    onSuccess: (createdSubTask) => {
      queryClient.setQueryData(
        ["subTasks", taskID],
        (prevSubTasks?: Array<SubTask>) => [
          ...(prevSubTasks ?? []),
          createdSubTask,
        ]
      );
    },
  });

  const updateSubTaskMutation = useMutation({
    mutationFn: ({
      subtaskID,
      updateSubtaskDto,
    }: {
      subtaskID: number;
      updateSubtaskDto: UpdateSubTaskDto;
    }) => {
      return API.updateSubTask(subtaskID, updateSubtaskDto);
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

  return {
    createSubTaskMutation: createSubTaskMutation,
    updateSubTaskMutation: updateSubTaskMutation,
    deleteSubTaskMutation: deleteSubTaskMutation,
  };
}
