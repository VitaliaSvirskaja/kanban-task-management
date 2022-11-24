import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ShowSidebar } from "./components/icons/ShowSidebar";
import { BoardDialog } from "./board/components/BoardDialog";
import { Board } from "./board/model/Board";
import { BoardContent } from "./board/components/BoardContent";
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import { useBoardMutations } from "./board/hooks/useBoardMutations";
import { MobileNavigationDialog } from "./components/MobileNavigationDialog";
import { useMobile } from "./hooks/useMobile";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileNavigationDialogVisible, setIsMobileNavigationDialogVisible] =
    useState(false);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [dialogVariant, setDialogVariant] = useState<"create" | "edit">(
    "create"
  );
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const { deleteBoardMutation } = useBoardMutations();

  const isMobile = useMobile();

  function handleCreateNewBoard() {
    if (isMobile) {
      setIsMobileNavigationDialogVisible(false);
    }
    setDialogVariant("create");
    setIsBoardDialogOpen(true);
    setSelectedBoard(null);
  }

  function handleEditBoard(board: Board) {
    if (isMobile) {
      setIsMobileNavigationDialogVisible(false);
    }
    setDialogVariant("edit");
    setIsBoardDialogOpen(true);
    setSelectedBoard(board);
  }

  async function handleDeleteBoard() {
    if (selectedBoard?.id === undefined) {
      return;
    }
    await deleteBoardMutation.mutateAsync(selectedBoard.id);
    setIsConfirmDialogOpen(false);
  }

  function handleOpenNavigation() {
    if (!isMobile) {
      return;
    }
    setIsMobileNavigationDialogVisible(true);
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        isVisible={isMobileNavigationDialogVisible}
        onOpenNavigation={handleOpenNavigation}
      />
      <div className="relative flex h-full">
        <main
          className={`relative z-0 w-full bg-light-grey transition-spacing dark:bg-very-dark-grey ${
            isSidebarVisible && !isMobile ? "pl-80" : ""
          }`}
        >
          {!isMobile && (
            <button
              className={`absolute bottom-6 left-0 z-10 flex items-center rounded-tr-full rounded-br-full bg-primary p-4 pr-6 hover:bg-primary-light `}
              onClick={() => setIsSidebarVisible(true)}
            >
              <ShowSidebar />
            </button>
          )}
          <BoardContent onAddNewBoard={handleCreateNewBoard} />
        </main>
        {isMobile ? (
          <MobileNavigationDialog
            open={isMobileNavigationDialogVisible}
            onClose={() => setIsMobileNavigationDialogVisible(false)}
            onCreateNewBoard={handleCreateNewBoard}
            onEditBoard={handleEditBoard}
          />
        ) : (
          <Sidebar
            isVisible={isSidebarVisible}
            onClose={() => setIsSidebarVisible(false)}
            onCreateNewBoard={handleCreateNewBoard}
            onEditBoard={handleEditBoard}
          />
        )}

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
          isLoading={deleteBoardMutation.isLoading}
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
