import { Dialog } from "@headlessui/react";
import { Button } from "./Button";
import { LoadingButton } from "./LoadingButton";

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
  <Dialog open={open} onClose={onClose} className="relative z-50">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/30 transition-transform"
      aria-hidden="true"
    >
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-8 dark:bg-dark-grey">
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
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
);
