import { useState } from "react";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ShowSidebar } from "./components/icons/ShowSidebar";
import { AddNewBoardDialog } from "./components/AddNewBoardDialog";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="relative flex h-full">
        <main
          className={`relative z-0 w-full bg-light-grey transition-spacing ${
            isSidebarVisible ? "pl-80" : ""
          }`}
        >
          <button
            className={`absolute bottom-6 left-0 z-20 flex items-center rounded-tr-full rounded-br-full bg-primary p-4 pr-6 hover:bg-primary-light `}
            onClick={() => setIsSidebarVisible(true)}
          >
            <ShowSidebar />
          </button>
          Content
          <AddNewBoardDialog />
        </main>

        <Sidebar
          isSidebarVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      </div>
    </div>
  );
};
