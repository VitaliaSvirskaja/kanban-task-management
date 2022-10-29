import { Input } from "./Input";
import { Close } from "./icons/Close";
import { FormEvent, useContext, useRef, useState } from "react";
import { CreateColumnDto } from "../model/CreateColumnDto";
import { BoardColumn } from "../model/BoardColumn";
import { API } from "./API";
import { boardContext } from "../context/BoardContext";
import { useClickAwayListener } from "../hooks/useClickAwayListener";
import { Add } from "./icons/Add";

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
    <div className="text-sm">
      {isAddingNewColumn ? (
        <form
          className="flex w-56 flex-col gap-2 rounded-lg bg-lines-light py-2 px-4"
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
            className="rounded-lg"
            placeholder="Enter column name"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary-light px-4 py-2 text-white hover:bg-primary"
            >
              Add New Column
            </button>
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
          className="flex w-56 max-w-xs items-center gap-2 rounded-lg bg-lines-light px-4 py-2 text-medium-grey hover:text-primary focus:outline-2 focus:outline-primary"
        >
          <Add />
          <p> Add New Column</p>
        </button>
      )}
    </div>
  );
};
