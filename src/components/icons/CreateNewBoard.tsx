import { Add } from "./Add";


export const CreateNewBoard = () => {
  return (
    <button className="flex w-full items-center text-primary gap-4  pr-6 pl-8 py-5 heading-m rounded-r-full hover:bg-primary/10 transition-colors">
      <Add/>
      <p>Create New Board</p>
    </button>
  );
};