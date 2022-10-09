import { useState } from "react";

export const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <header className="h-20 bg-blue-300">Header</header>
      <div className="relative flex h-full">
        <aside
          className={`absolute top-0 left-0 h-full w-80 bg-amber-300 transition-transform ${
            isSidebarVisible ? "" : "-translate-x-full"
          }`}
        >
          <div>Sidebar</div>
        </aside>
        <main
          className={`w-full bg-violet-300 transition-spacing ${
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
