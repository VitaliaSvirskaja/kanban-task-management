import { Input } from "../../components/Input";
import { Close } from "../../components/icons/Close";
import { FormEvent, useRef, useState } from "react";
import { CreateColumnDto } from "../model/CreateColumnDto";
import { useSelectedBoard } from "../../board/context/SelectedBoardContext";
import { useClickAwayListener } from "../../hooks/useClickAwayListener";
import { Add } from "../../components/icons/Add";
import { useBoardColumnMutations } from "../hooks/useBoardColumnMutations";
import { LoadingButton } from "../../components/LoadingButton";

export const AddNewColumnForm = () => {
  const { selectedBoardID } = useSelectedBoard();
  const [columnName, setColumnName] = useState("");
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useClickAwayListener(formRef, () => setIsAddingNewColumn(false));

  const { createBoardColumnMutation } = useBoardColumnMutations();

  async function handleNewColumn() {
    if (selectedBoardID === null || columnName === "") {
      return;
    }
    const createColumnDto: CreateColumnDto = {
      boardId: selectedBoardID,
      title: columnName,
    };
    await createBoardColumnMutation.mutateAsync(createColumnDto);

    setColumnName("");
    setIsAddingNewColumn(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleNewColumn();
  }

  return (
    <div className="text-sm">
      {isAddingNewColumn ? (
        <form
          className="flex w-56 flex-col gap-2 rounded-lg bg-lines-light py-2 px-4 dark:bg-dark-grey"
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
            <LoadingButton
              type="submit"
              text="Save"
              variant="primary"
              size="small"
              isLoading={createBoardColumnMutation.isLoading}
            />
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
          className="flex w-56 max-w-xs items-center gap-2 rounded-lg bg-lines-light px-4 py-2 text-medium-grey hover:text-primary focus:outline-2 focus:outline-primary dark:bg-primary dark:text-white dark:hover:bg-primary-light dark:hover:text-dark-grey"
        >
          <Add />
          <p> Add New Column</p>
        </button>
      )}
    </div>
  );
};
