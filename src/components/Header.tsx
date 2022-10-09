import logoDark from "../assets/logo-dark.svg";
import { Button } from "./Button";
import { Add } from "./icons/Add";

export const Header = () => {
  // TODO: get board name from active selected board
  const activeBoardName = "Platform Launch";

  // TODO: get information about boards & columns from boards-context
  const isBoardsEmpty = true;
  const isBoardColumnsEmpty = true;

  function handleAddNewTaskClick() {
    // TODO: open dialog for adding new tasks
    console.log("handleAddNewTaskClick");
  }

  return (
    <header className="flex h-28">
      <div className="flex w-80 items-center border-r border-r-lines-light pl-8">
        <img src={logoDark} alt="" />
      </div>
      <div className="flex flex-1 items-center justify-between px-8">
        <p className="heading-xl">{activeBoardName}</p>
        <Button
          text="Add New Task"
          icon={<Add />}
          disabled={isBoardsEmpty || isBoardColumnsEmpty}
          onClick={handleAddNewTaskClick}
        />
      </div>
    </header>
  );
};
