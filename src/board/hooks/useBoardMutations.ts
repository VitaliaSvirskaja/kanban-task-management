import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../utils/API";
import { Board } from "../model/Board";
import { useSelectedBoard } from "../context/SelectedBoardContext";
import { UpdateBoardDto } from "../model/UpdateBoardDto";

export function useBoardMutations() {
  const { selectedBoardID, selectBoard } = useSelectedBoard();

  const queryClient = useQueryClient();
  const createBoardMutation = useMutation({
    mutationFn: API.createBoard,
    onSuccess: (createdBoard) => {
      queryClient.setQueryData(["boards"], (prevBoards?: Array<Board>) => [
        ...(prevBoards ?? []),
        createdBoard,
      ]);
      selectBoard(createdBoard.id);
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: ({
      selectedBoardID,
      updateBoardDto,
    }: {
      selectedBoardID: number;
      updateBoardDto: UpdateBoardDto;
    }) => {
      return API.updateBoard(selectedBoardID, updateBoardDto);
    },
    onSuccess: (updatedBoard: Board) => {
      queryClient.setQueryData(["boards"], (prevBoards?: Array<Board>) => {
        return prevBoards?.map((prevBoard) => {
          return prevBoard.id === updatedBoard.id ? updatedBoard : prevBoard;
        });
      });
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: API.deleteBoard,
    onSuccess: (_data, deletedBoardID) => {
      queryClient.setQueryData(["boards"], (prevBoards?: Array<Board>) => {
        const updatedBoards = prevBoards?.filter((prevBoard) => {
          return prevBoard.id !== deletedBoardID;
        });

        if (selectedBoardID === deletedBoardID && updatedBoards !== undefined) {
          selectBoard(updatedBoards[0]?.id ?? null);
        }
        return updatedBoards;
      });
    },
  });

  return {
    createBoardMutation: createBoardMutation,
    updateBoardMutation: updateBoardMutation,
    deleteBoardMutation: deleteBoardMutation,
  };
}
