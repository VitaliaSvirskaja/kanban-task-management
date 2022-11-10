import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { BoardColumn } from "../model/BoardColumn";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";
import { UpdateBoardColumnDto } from "../model/UpdateBoardColumnDto";

export function useBoardColumnMutations() {
  const { selectedBoardID } = useSelectedBoard();
  const queryClient = useQueryClient();

  const createBoardColumnMutation = useMutation({
    mutationFn: API.createColumn,
    onSuccess: (createdBoardColumn) => {
      queryClient.setQueryData(
        ["boardColumns", selectedBoardID],
        (prevBoardColumns?: Array<BoardColumn>) => [
          ...(prevBoardColumns ?? []),
          createdBoardColumn,
        ]
      );
    },
  });

  const updateBoardColumnMutation = useMutation({
    mutationFn: ({
      boardColumID,
      updateBoardColumnDto,
    }: {
      boardColumID: number;
      updateBoardColumnDto: UpdateBoardColumnDto;
    }) => {
      return API.updateColumn(boardColumID, updateBoardColumnDto);
    },
    onSuccess: (updatedBoardColumn) => {
      queryClient.setQueryData(
        ["boardColumns", selectedBoardID],
        (prevBoardColumns?: Array<BoardColumn>) => {
          return prevBoardColumns?.map((prevBoardColumn) => {
            return prevBoardColumn.id === updatedBoardColumn.id
              ? updatedBoardColumn
              : prevBoardColumn;
          });
        }
      );
    },
  });

  const deleteBoardColumnMutation = useMutation({
    mutationFn: API.deleteColumn,
    onSuccess: (_data, deletedBoardColumnID) => {
      queryClient.setQueryData(
        ["boardColumns", selectedBoardID],
        (prevBoardColumns?: Array<BoardColumn>) => {
          return prevBoardColumns?.filter((prevBoardColumn) => {
            return prevBoardColumn.id !== deletedBoardColumnID;
          });
        }
      );
    },
  });

  return {
    createBoardColumnMutation: createBoardColumnMutation,
    updateBoardColumnMutation: updateBoardColumnMutation,
    deleteBoardColumnMutation: deleteBoardColumnMutation,
  };
}
