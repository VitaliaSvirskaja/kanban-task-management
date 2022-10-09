import { useState } from "react";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-20">
        <div className="w-80 border-r border-r-lines-light">Logo</div>
        <div>Platform Launch</div>
      </header>
      <div className="relative flex h-full">
        <aside
          className={`absolute top-0 left-0 h-full w-80 border-r border-r-lines-light transition-transform ${
            isSidebarVisible ? "" : "-translate-x-full"
          }`}
        >
          <div>Sidebar</div>
        </aside>
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
