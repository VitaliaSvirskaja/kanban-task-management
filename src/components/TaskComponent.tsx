import { Task } from "../model/Task";
import { useSubtasks } from "../hooks/useSubtasks";

interface Props {
  task: Task;
  onClick: () => void;
}

export const TaskComponent = ({ task, onClick }: Props) => {
  //  FIXME: revalidate with react query
  const { subTasks } = useSubtasks(task.id);
  const subTaskCount: number = subTasks.length;
  const checkedSubtasks = subTasks.filter((subTask) => {
    return subTask.done;
  });
  const checkedSubtasksCount: number = checkedSubtasks.length;

  return (
    <div>
      <button
        className="heading-m w-full rounded-lg bg-white py-6 px-4 text-left shadow hover:text-primary focus:outline-2 focus:outline-primary dark:bg-dark-grey dark:text-white"
        onClick={onClick}
      >
        {`${task.title}`}
        <p>{`${checkedSubtasksCount}/${subTaskCount} subtasks`}</p>
      </button>
    </div>
  );
};
