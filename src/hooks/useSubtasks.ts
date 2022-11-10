import { SubTask } from "../model/SubTask";
import { API } from "../components/API";
import { useQuery } from "@tanstack/react-query";

export function useSubtasks(taskID: number): Array<SubTask> {
  const { data: subTasks } = useQuery({
    queryKey: ["subTasks", taskID],
    queryFn: () => API.getSubTasks(taskID),
  });

  return subTasks ?? [];
}
