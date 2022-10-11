import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./Button";
import { Add } from "./icons/Add";
import { Close } from "./icons/Close";

// interface Props {}

type Inputs = {
  boardName: string;
};

export const AddNewBoardDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newBoard, setNewBoard] = useState("");
  const { register, handleSubmit } = useForm<Inputs>({ mode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setNewBoard(data.boardName);
    console.log(data.boardName);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Backdrop */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Full screen container to center the dialog panel*/}
        <Dialog.Panel className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded bg-white p-8">
          <div className="flex items-center justify-between">
            <Dialog.Title className="heading-l">Add New Board</Dialog.Title>
            <Close
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-3"
          >
            <Input label="Name" type="text" {...register("boardName")} />

            <div className=" flex w-full flex-col gap-3">
              <Button
                type="submit"
                variant="primary"
                size="small"
                className=""
                text="Create New Board"
              />

              {/* TODO Logik für ergänzen neuer Inputfelder implementieren (mit Löschen)*/}
              <Button
                type="button"
                size="small"
                variant="secondary"
                text="Add New Column"
                icon={<Add />}
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
