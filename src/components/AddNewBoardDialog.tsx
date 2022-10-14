import { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "./Input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "./Button";
import { Add } from "./icons/Add";
import { Close } from "./icons/Close";
import { CreateBoardDto } from "../model/CreateBoardDto";
import { boardContext } from "../context/BoardContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  boardName: string;
  boardColumns: Array<{
    columnName: string;
  }>;
};

export const AddNewBoardDialog = ({ isOpen, onClose }: Props) => {
  const { createBoard } = useContext(boardContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "boardColumns",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const createBoardDto: CreateBoardDto = {
      title: data.boardName,
      initialBoardColumnNames: data.boardColumns.map(
        (boardColumn) => boardColumn.columnName
      ),
    };
    await createBoard(createBoardDto);
    onClose();
  };

  return (
    // TODO add transition
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0  bg-black/30 transition-transform"
        aria-hidden="true"
      />
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded bg-white p-8">
          <div className="flex items-center justify-between">
            <Dialog.Title className="heading-l">Add New Board</Dialog.Title>
            <Close onClick={onClose} />
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-3"
          >
            <Input
              label="Name"
              type="text"
              {...register("boardName", {
                validate: (input: string) => {
                  if (input === "") {
                    return "Can't be empty.";
                  }
                },
              })}
              error={errors.boardName?.message}
            />
            <p className="body-m text-left text-medium-grey">Board Columns</p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex w-full items-center gap-2">
                <Input
                  type="text"
                  {...register(`boardColumns.${index}.columnName`)}
                />
                <Close onClick={() => remove(index)} />
              </div>
            ))}
            <div className=" flex w-full flex-col gap-3">
              {/* TODO: loading indicator while waiting for response */}
              <Button
                type="button"
                size="small"
                variant="secondary"
                text="Add New Column"
                icon={<Add />}
                onClick={() => append({ columnName: "" })}
              />
              <Button
                type="submit"
                variant="primary"
                size="small"
                text="Create New Board"
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
