import { Task } from "./Task";

export interface BoardColumn {
  id: number;
  title: string;
  tasks: Array<Task>;
}
