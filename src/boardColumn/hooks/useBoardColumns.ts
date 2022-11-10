import { BoardColumn } from "../model/BoardColumn";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";

export function useBoardColumns(): Array<BoardColumn> {
  const { selectedBoardID } = useSelectedBoard();

  const { data: boardColumns } = useQuery({
    queryKey: ["boardColumns", selectedBoardID],
    queryFn: () => {
      if (selectedBoardID) {
        return API.getColumns(selectedBoardID);
      }
    },
    enabled: selectedBoardID !== null,
  });

  return boardColumns ?? [];
}
