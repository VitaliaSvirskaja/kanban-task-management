import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { SubTask } from "../model/SubTask";
import { UpdateSubTaskDto } from "../model/UpdateSubTaskDto";
import { CreateSubTaskDto } from "../model/CreateSubTaskDto";

export function useSubtaskMutations(taskID: number) {
  const queryClient = useQueryClient();

  const createSubTaskMutation = useMutation({
    mutationFn: API.createSubTask,
    onMutate: (createSubTaskDto: CreateSubTaskDto) => {
      const prevSubtasks: Array<SubTask> =
        queryClient.getQueryData(["subTasks", taskID]) ?? [];
      const newSubtask: SubTask = {
        id: Date.now(),
        text: createSubTaskDto.text,
        done: false,
      };
      queryClient.setQueryData(
        ["subTasks", taskID],
        [...prevSubtasks, newSubtask]
      );
      return { prevSubtasks };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["subTasks", taskID], context?.prevSubtasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["subTasks", taskID]);
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
    onMutate: ({ subtaskID, updateSubtaskDto }) => {
      const prevSubtasks: Array<SubTask> =
        queryClient.getQueryData(["subTasks", taskID]) ?? [];
      const updatedSubtask: SubTask = {
        id: subtaskID,
        text: updateSubtaskDto.text,
        done: updateSubtaskDto.done,
      };
      queryClient.setQueryData(
        ["subTasks", taskID],
        prevSubtasks.map((prevSubtask) => {
          return prevSubtask.id === subtaskID ? updatedSubtask : prevSubtask;
        })
      );
      return { prevSubtasks };
    },
    onError: (_error, _variables, context) =>
      queryClient.setQueryData(["subTasks", taskID], context?.prevSubtasks),
  });

  const deleteSubTaskMutation = useMutation({
    mutationFn: API.deleteSubTask,
    onMutate: (deletedSubTaskID) => {
      const prevSubtasks: Array<SubTask> =
        queryClient.getQueryData(["subTasks", taskID]) ?? [];
      queryClient.setQueryData(
        ["subTasks", taskID],
        prevSubtasks.filter((prevSubtask) => {
          return prevSubtask.id !== deletedSubTaskID;
        })
      );
      return { prevSubtasks };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["subTasks", taskID], context?.prevSubtasks);
    },
  });

  return {
    createSubTaskMutation: createSubTaskMutation,
    updateSubTaskMutation: updateSubTaskMutation,
    deleteSubTaskMutation: deleteSubTaskMutation,
  };
}
