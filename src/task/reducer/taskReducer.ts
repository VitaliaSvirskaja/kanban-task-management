import { Task } from "../model/Task";

type Action =
  | { type: "closeConfirmation" }
  | { type: "closeTaskDialog" }
  | { type: "openDeleteTaskDialog" }
  | { type: "selectTaskToBeUpdated"; payload: Task }
  | { type: "updateTask" }
  | { type: "confirmTaskDelete" };

interface State {
  isDialogOpen: boolean;
  isConfirmDialogOpen: boolean;
  taskToBeUpdated: Task | null;
}

export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "closeConfirmation":
      return { ...state, isConfirmDialogOpen: false, isDialogOpen: true };
    case "closeTaskDialog":
      return { ...state, isDialogOpen: false, taskToBeUpdated: null };
    case "openDeleteTaskDialog":
      return { ...state, isConfirmDialogOpen: true, isDialogOpen: false };
    case "selectTaskToBeUpdated":
      return { ...state, taskToBeUpdated: action.payload, isDialogOpen: true };
    case "updateTask":
      return { ...state, taskToBeUpdated: null, isDialogOpen: false };
    case "confirmTaskDelete":
      return { ...state, taskToBeUpdated: null, isConfirmDialogOpen: false };
  }
}
