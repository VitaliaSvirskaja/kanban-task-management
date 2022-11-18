import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";

export function useTasks(boardColumnID: number) {
  return useQuery({
    queryKey: ["tasks", boardColumnID],
    queryFn: () => API.getTasks(boardColumnID),
  });
}
