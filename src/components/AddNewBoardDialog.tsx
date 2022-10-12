import { Dialog } from "@headlessui/react";
import { Input } from "./Input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "./Button";
import { Add } from "./icons/Add";
import { Close } from "./icons/Close";

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
  const { control, register, handleSubmit } = useForm<Inputs>({
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "boardColumns",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO Interaktion mit API ergänzen
    console.log(data);
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-3"
          >
            <Input label="Name" type="text" {...register("boardName")} />
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