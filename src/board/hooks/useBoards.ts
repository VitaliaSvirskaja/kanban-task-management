import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { useSelectedBoard } from "../context/SelectedBoardContext";

export function useBoards() {
  const { selectBoard } = useSelectedBoard();
  const queryResult = useQuery({
    queryKey: ["boards"],
    queryFn: API.fetchBoards,
    onSuccess: (fetchedBoards) => {
      const isFirstFetch = !queryResult.isFetchedAfterMount;
      if (isFirstFetch) {
        selectBoard(fetchedBoards[0]?.id ?? null);
      }
    },
  });

  return queryResult;
}
