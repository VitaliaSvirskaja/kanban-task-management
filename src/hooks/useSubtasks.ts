import { SubTask } from "../model/SubTask";
import { API } from "../components/API";
import { useEffect, useState } from "react";

export function useSubtasks(taskID: number) {
  const [subTasks, setSubTasks] = useState<Array<SubTask>>([]);

  useEffect(() => {
    async function fetchSubTasks() {
      const fetchedSubTasks = await API.getSubTasks(taskID);
      setSubTasks(fetchedSubTasks);
    }
    fetchSubTasks();
  }, [taskID]);

  function handleNewSubTask(createdSubTask: SubTask) {
    setSubTasks([...subTasks, createdSubTask]);
  }

  async function handleDeleteSubtask(subTaskID: number) {
    await API.deleteSubTask(subTaskID);
    const updatedSubtasks: Array<SubTask> = subTasks.filter(
      (subTask) => subTask.id !== subTaskID
    );
    setSubTasks(updatedSubtasks);
  }

  function handleUpdateSubtask(updatedSubtask: SubTask) {
    const updatedSubtasks: Array<SubTask> = subTasks.map((subTask) =>
      subTask.id === updatedSubtask.id ? updatedSubtask : subTask
    );
    setSubTasks(updatedSubtasks);
  }

  return {
    subTasks,
    handleNewSubTask,
    handleDeleteSubtask,
    handleUpdateSubtask,
  };
}
