import { Input } from "./Input";
import { Close } from "./icons/Close";
import { FormEvent, useContext, useRef, useState } from "react";
import { CreateColumnDto } from "../model/CreateColumnDto";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { boardContext } from "../context/BoardContext";
import { useClickAwayListener } from "../hooks/useClickAwayListener";

interface Props {
  onNewBoardColumn: (createdBoardColumn: BoardColumn) => void;
}

export const AddNewColumnForm = (props: Props) => {
  const { activeBoard } = useContext(boardContext);
  const [columnName, setColumnName] = useState("");
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useClickAwayListener(formRef, () => setIsAddingNewColumn(false));

  async function handleNewColumn() {
    if (activeBoard === null || columnName === "") {
      return;
    }
    const createColumnDto: CreateColumnDto = {
      boardId: activeBoard,
      title: columnName,
    };
    const createdBoardColumn: BoardColumn = await API.createColumn(
      createColumnDto
    );

    setIsAddingNewColumn(false);
    setColumnName("");
    props.onNewBoardColumn(createdBoardColumn);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleNewColumn();
  }

  return (
    <>
      {isAddingNewColumn ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsAddingNewColumn(false);
            }
          }}
        >
          <Input
            value={columnName}
            onChange={(event) => setColumnName(event.target.value)}
            autoFocus
          />

          <div className="flex">
            <button type="submit">Add New Column</button>
            <button type="reset" onClick={() => setIsAddingNewColumn(false)}>
              <Close />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => {
            setIsAddingNewColumn(true);
          }}
        >
          Add new Column
        </button>
      )}
    </>
  );
};
