import { useState } from "react";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="relative flex h-full">
        <Sidebar isSidebarVisible={isSidebarVisible}/>
        <main
          className={`w-full bg-light-grey transition-spacing ${
            isSidebarVisible ? "ml-80" : ""
          }`}
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          Content
        </main>
      </div>
    </div>
  );
};
