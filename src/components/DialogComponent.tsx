import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DialogComponent = ({
  open,
  onClose,
  children,
}: PropsWithChildren<Props>) => (
  <Dialog open={open} onClose={onClose} className="relative z-50">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/30 transition-transform"
      aria-hidden="true"
    >
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 z-50 mx-5 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-6 dark:bg-dark-grey">
          {children}
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
);
