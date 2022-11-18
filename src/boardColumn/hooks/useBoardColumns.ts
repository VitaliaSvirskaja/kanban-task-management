import { useQuery } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";

export function useBoardColumns() {
  const { selectedBoardID } = useSelectedBoard();

  return useQuery({
    queryKey: ["boardColumns", selectedBoardID],
    queryFn: () => {
      if (selectedBoardID) {
        return API.getColumns(selectedBoardID);
      }
    },
    enabled: selectedBoardID !== null,
  });
}
