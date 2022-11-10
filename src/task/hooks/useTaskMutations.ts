import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { Task } from "../model/Task";
import { UpdateTaskDto } from "../model/UpdateTaskDto";

export function useTaskMutations(boardColumnID: number) {
  const queryClient = useQueryClient();

  const createNewTaskMutation = useMutation({
    mutationFn: API.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(
        ["tasks", boardColumnID],
        (prevTasks?: Array<Task>) => [...(prevTasks ?? []), newTask]
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskID,
      updateTaskDto,
    }: {
      taskID: number;
      updateTaskDto: UpdateTaskDto;
    }) => {
      return API.updateTask(taskID, updateTaskDto);
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        ["tasks", boardColumnID],
        (prevTasks?: Array<Task>) => {
          return prevTasks?.map((prevTask) => {
            return prevTask.id === updatedTask.id ? updatedTask : prevTask;
          });
        }
      );
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: API.deleteTask,
    onSuccess: (_data, deletedTaskID) => {
      queryClient.setQueryData(
        ["tasks", boardColumnID],
        (prevTasks?: Array<Task>) => {
          return prevTasks?.filter((prevTask) => {
            return prevTask.id !== deletedTaskID;
          });
        }
      );
    },
  });

  return {
    createNewTaskMutation: createNewTaskMutation,
    updateTaskMutation: updateTaskMutation,
    deleteTaskMutation: deleteTaskMutation,
  };
}
