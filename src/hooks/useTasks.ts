import { Task } from "../model/Task";
import { useQuery } from "@tanstack/react-query";
import { API } from "../components/API";

export function useTasks(boardColumnID: number): Array<Task> {
  const { data: tasks } = useQuery({
    queryKey: ["tasks", boardColumnID],
    queryFn: () => API.getTasks(boardColumnID),
  });

  return tasks ?? [];
}
