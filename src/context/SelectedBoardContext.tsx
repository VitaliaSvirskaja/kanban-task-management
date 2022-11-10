import React, { PropsWithChildren, useContext, useState } from "react";

interface SelectedBoardContext {
  selectedBoardID: number | null;
  selectBoard: (boardID: number | null) => void;
}

const selectedBoardContext = React.createContext<SelectedBoardContext>({
  selectedBoardID: null,
  selectBoard: () => undefined,
});

export const SelectedBoardContextProvider = (props: PropsWithChildren) => {
  const [selectedBoardID, setSelectedBoardID] = useState<number | null>(null);

  return (
    <selectedBoardContext.Provider
      value={{
        selectedBoardID: selectedBoardID,
        selectBoard: setSelectedBoardID,
      }}
    >
      {props.children}
    </selectedBoardContext.Provider>
  );
};

export function useSelectedBoard() {
  return useContext(selectedBoardContext);
}
