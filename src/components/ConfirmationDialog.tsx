import { Dialog } from "@headlessui/react";
import { Button } from "./Button";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationDialog = ({
  title,
  description,
  open,
  onClose,
  onConfirm,
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
            <Button
              text="Delete"
              variant="destructive"
              size="small"
              onClick={onConfirm}
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
