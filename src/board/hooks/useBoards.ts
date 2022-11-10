import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { useSelectedBoard } from "../context/SelectedBoardContext";
import { Board } from "../model/Board";

export function useBoards(): Array<Board> {
  const { selectBoard } = useSelectedBoard();
  const { data: boards } = useQuery({
    queryKey: ["boards"],
    queryFn: API.fetchBoards,
    onSuccess: (fetchedBoards) => {
      if (fetchedBoards !== undefined) {
        selectBoard(fetchedBoards[0]?.id ?? null);
      }
    },
  });

  return boards ?? [];
}
