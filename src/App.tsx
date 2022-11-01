import { useContext, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ShowSidebar } from "./components/icons/ShowSidebar";
import { BoardDialog } from "./components/BoardDialog";
import { Board } from "./model/Board";
import { BoardContent } from "./components/BoardContent";
import { boardContext } from "./context/BoardContext";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);

  const [dialogVariant, setDialogVariant] = useState<"create" | "edit">(
    "create"
  );
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const { deleteBoard } = useContext(boardContext);

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
    await deleteBoard(selectedBoard?.id);
    setIsBoardDialogOpen(false);
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
          onDeleteBoard={handleDeleteBoard}
        />
      </div>
    </div>
  );
};
