import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { BoardColumn } from "../model/BoardColumn";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";
import { UpdateBoardColumnDto } from "../model/UpdateBoardColumnDto";

interface UpdateBoardColumnParam {
  boardColumID: number;
  updateBoardColumnDto: UpdateBoardColumnDto;
}

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
    }: UpdateBoardColumnParam) => {
      return API.updateColumn(boardColumID, updateBoardColumnDto);
    },
    onMutate: async ({
      boardColumID,
      updateBoardColumnDto,
    }: UpdateBoardColumnParam) => {
      const queryKey = ["boardColumns", selectedBoardID];
      const prevBoardColumns: Array<BoardColumn> =
        queryClient.getQueryData(queryKey) ?? [];
      const updatedBoardColumn: BoardColumn = {
        id: boardColumID,
        title: updateBoardColumnDto.title,
      };
      const updatedBoardColumns = prevBoardColumns.map((prevBoardColumn) => {
        return prevBoardColumn.id === boardColumID
          ? updatedBoardColumn
          : prevBoardColumn;
      });
      queryClient.setQueryData(queryKey, updatedBoardColumns);
      return { prevBoardColumns };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["boardColumns", selectedBoardID],
        context?.prevBoardColumns ?? []
      );
    },
  });

  const deleteBoardColumnMutation = useMutation({
    mutationFn: API.deleteColumn,
    mutationKey: ["deleteBoardColumn"],
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
