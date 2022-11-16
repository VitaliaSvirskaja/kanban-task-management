import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { useSelectedBoard } from "../context/SelectedBoardContext";
import { Board } from "../model/Board";

export function useBoards(): Array<Board> {
  const { selectBoard } = useSelectedBoard();
  const { data: boards, isFetchedAfterMount } = useQuery({
    queryKey: ["boards"],
    queryFn: API.fetchBoards,
    onSuccess: (fetchedBoards) => {
      const isFirstFetch = !isFetchedAfterMount;
      if (isFirstFetch) {
        selectBoard(fetchedBoards[0]?.id ?? null);
      }
    },
  });

  return boards ?? [];
}
