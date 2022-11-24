import { Button } from "./Button";
import { LoadingButton } from "./LoadingButton";
import { DialogComponent } from "./DialogComponent";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const ConfirmationDialog = ({
  title,
  description,
  open,
  onClose,
  onConfirm,
  isLoading,
}: Props) => (
  <DialogComponent open={open} onClose={onClose}>
    <div className="flex flex-col gap-6">
      <h1 className="heading-l text-red">{title}</h1>
      <p className="body-l text-medium-grey">{description}</p>
    </div>
    <div className="flex gap-4">
      <LoadingButton
        text="Delete"
        variant="destructive"
        size="small"
        onClick={onConfirm}
        isLoading={isLoading}
      />
      <Button
        text="Cancel"
        variant="secondary"
        size="small"
        onClick={onClose}
      />
    </div>
  </DialogComponent>
);
