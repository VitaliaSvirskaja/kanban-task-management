import { Button } from "./Button";
import { Add } from "./icons/Add";

interface Props {
  onAddNewBoard: () => void;
}

export const NoExistingBoards = ({ onAddNewBoard }: Props) => (
  <div className="m-auto flex h-full max-w-screen-sm flex-col items-center justify-center gap-8 dark:bg-very-dark-grey">
    <p className="heading-l text-medium-grey">
      There is no board existing. Create a new board to get started.
    </p>
    <Button text="Add New Board" icon={<Add />} onClick={onAddNewBoard} />
  </div>
);
