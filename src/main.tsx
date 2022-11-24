import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { SelectedBoardContextProvider } from "./board/context/SelectedBoardContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMobile } from "./hooks/useMobile";
import { TouchBackend } from "react-dnd-touch-backend";

const queryClient = new QueryClient();

const DnDProviderWrapper = () => {
  const isMobile = useMobile();
  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={{ enableMouseEvents: true }}
    >
      <App />
    </DndProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <SelectedBoardContextProvider>
          <DnDProviderWrapper />
        </SelectedBoardContextProvider>
      </ThemeContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
