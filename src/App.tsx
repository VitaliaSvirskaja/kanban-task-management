import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ShowSidebar } from "./components/icons/ShowSidebar";
import { BoardDialog } from "./board/components/BoardDialog";
import { Board } from "./board/model/Board";
import { BoardContent } from "./board/components/BoardContent";
import { useSelectedBoard } from "./board/context/SelectedBoardContext";
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "./utils/API";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [dialogVariant, setDialogVariant] = useState<"create" | "edit">(
    "create"
  );
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const { selectedBoardID, selectBoard } = useSelectedBoard();

  const queryClient = useQueryClient();
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

  function handleCreateNewBoard() {
    setDialogVariant("create");
    setIsBoardDialogOpen(true);
    setSelectedBoard(null);
  }

  function handleEditBoard(board: Board) {
    setDialogVariant("edit");
    setIsBoardDialogOpen(true);
    setSelectedBoard(board);
  }

  async function handleDeleteBoard() {
    if (selectedBoard?.id === undefined) {
      return;
    }
    deleteBoardMutation.mutate(selectedBoard.id);
    setIsConfirmDialogOpen(false);
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="relative flex h-full">
        <main
          className={`relative z-0 w-full bg-light-grey transition-spacing dark:bg-very-dark-grey ${
            isSidebarVisible ? "pl-80" : ""
          }`}
        >
          <button
            className={`absolute bottom-6 left-0 z-10 flex items-center rounded-tr-full rounded-br-full bg-primary p-4 pr-6 hover:bg-primary-light `}
            onClick={() => setIsSidebarVisible(true)}
          >
            <ShowSidebar />
          </button>
          <BoardContent onAddNewBoard={handleCreateNewBoard} />
        </main>
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
          onCreateNewBoard={handleCreateNewBoard}
          onEditBoard={handleEditBoard}
        />
        <BoardDialog
          key={selectedBoard?.id}
          variant={dialogVariant}
          isOpen={isBoardDialogOpen}
          onClose={() => {
            setSelectedBoard(null);
            setIsBoardDialogOpen(false);
          }}
          selectedBoard={selectedBoard}
          onDeleteBoard={() => {
            setIsConfirmDialogOpen(true);
            setIsBoardDialogOpen(false);
          }}
        />
        <ConfirmationDialog
          title="Delete this board?"
          description={`Are you sure you want to delete the ‘${selectedBoard?.title}’ board? This action will remove all columns and tasks and cannot be reversed.`}
          open={isConfirmDialogOpen}
          onClose={() => {
            setIsConfirmDialogOpen(false);
            setIsBoardDialogOpen(true);
          }}
          onConfirm={handleDeleteBoard}
        />
      </div>
    </div>
  );
};
