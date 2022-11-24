import { Task } from "../model/Task";
import { useSubtasks } from "../../subtask/hooks/useSubtasks";
import { useDrag } from "react-dnd";

interface Props {
  task: Task;
  onClick: () => void;
}

export const TaskComponent = ({ task, onClick }: Props) => {
  const subTasks = useSubtasks(task.id);
  const subTaskCount: number = subTasks.length;
  const checkedSubtasks = subTasks.filter((subTask) => {
    return subTask.done;
  });
  const checkedSubtasksCount: number = checkedSubtasks.length;

  const [{ isDragging }, dragRef] = useDrag(() => {
    return {
      type: "task",
      item: task,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    };
  });

  return (
    <button
      ref={dragRef}
      className={`heading-m flex w-full flex-col gap-1.5 rounded-lg bg-white py-6 px-4 text-left text-black shadow transition-shadow hover:text-primary hover:shadow-md focus:outline-2 focus:outline-primary dark:bg-dark-grey dark:text-white ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      <p className="max-w-full break-words">{task.title}</p>
      {subTasks.length > 0 && (
        <p className="body-m text-medium-grey">{`${checkedSubtasksCount}/${subTaskCount} subtasks`}</p>
      )}
    </button>
  );
};
