import { Dialog } from "@headlessui/react";
import { Input } from "../../components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Close } from "../../components/icons/Close";
import { CreateBoardDto } from "../model/CreateBoardDto";
import { UpdateBoardDto } from "../model/UpdateBoardDto";
import { Board } from "../model/Board";
import { useBoardMutations } from "../hooks/useBoardMutations";
import { LoadingButton } from "../../components/LoadingButton";
import { DialogComponent } from "../../components/DialogComponent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  variant: "create" | "edit";
  selectedBoard: Board | null;
  onDeleteBoard: () => void;
}

type Inputs = {
  boardName: string;
};

export const BoardDialog = ({
  isOpen,
  onClose,
  variant,
  selectedBoard,
  onDeleteBoard,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      boardName: selectedBoard?.title ?? "",
    },
  });

  const { createBoardMutation, updateBoardMutation } = useBoardMutations();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (variant === "create") {
      const createBoardDto: CreateBoardDto = {
        title: data.boardName,
      };
      await createBoardMutation.mutateAsync(createBoardDto);
    }

    if (variant === "edit" && selectedBoard !== null) {
      const updateBoardDto: UpdateBoardDto = {
        title: data.boardName,
      };
      await updateBoardMutation.mutateAsync({
        selectedBoardID: selectedBoard.id,
        updateBoardDto: updateBoardDto,
      });
    }

    reset();
    onClose();
  };

  return (
    <DialogComponent open={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between">
        <Dialog.Title className="heading-l dark:text-white">
          {variant === "create" ? "Add New Board" : "Edit Board"}
        </Dialog.Title>
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

        <div className=" flex w-full flex-col gap-3">
          <LoadingButton
            type="submit"
            variant="primary"
            size="small"
            text={variant === "create" ? "Create New Board" : "Save Changes"}
            isLoading={
              createBoardMutation.isLoading || updateBoardMutation.isLoading
            }
          />
          {variant === "edit" && (
            <Button
              text="Delete Board"
              type="button" // prevent submit event of board dialog
              variant="secondary"
              size="small"
              onClick={onDeleteBoard}
            />
          )}
        </div>
      </form>
    </DialogComponent>
  );
};
