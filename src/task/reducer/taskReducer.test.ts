import { describe, expect, it } from "vitest";
import { taskReducer } from "./taskReducer";

const task = { id: 1, title: "Task", description: "" };

describe("taskReducer", () => {
  it("should close the confirmation dialog", () => {
    const result = taskReducer(
      {
        isConfirmDialogOpen: true,
        isDialogOpen: false,
        taskToBeUpdated: task,
      },
      { type: "closeConfirmation" }
    );
    expect(result).toEqual({
      taskToBeUpdated: task,
      isConfirmDialogOpen: false,
      isDialogOpen: true,
    });
  });

  it("close the task dialog", () => {
    const result = taskReducer(
      { isDialogOpen: true, isConfirmDialogOpen: false, taskToBeUpdated: task },
      { type: "closeTaskDialog" }
    );
    expect(result).toEqual({
      taskToBeUpdated: null,
      isConfirmDialogOpen: false,
      isDialogOpen: false,
    });
  });

  it("should open the delete task dialog", () => {
    const result = taskReducer(
      { isDialogOpen: true, isConfirmDialogOpen: false, taskToBeUpdated: task },
      { type: "openDeleteTaskDialog" }
    );
    expect(result).toEqual({
      isDialogOpen: false,
      isConfirmDialogOpen: true,
      taskToBeUpdated: task,
    });
  });

  it("should select the task which is to be updated", () => {
    const result = taskReducer(
      { isDialogOpen: true, isConfirmDialogOpen: false, taskToBeUpdated: task },
      { type: "selectTaskToBeUpdated", payload: task }
    );
    expect(result).toEqual({
      isDialogOpen: true,
      isConfirmDialogOpen: false,
      taskToBeUpdated: task,
    });
  });

  it("should update the task", () => {
    const result = taskReducer(
      { isDialogOpen: true, isConfirmDialogOpen: false, taskToBeUpdated: task },
      { type: "updateTask" }
    );
    expect(result).toEqual({
      isDialogOpen: false,
      isConfirmDialogOpen: false,
      taskToBeUpdated: null,
    });
  });

  it("should confirm the task delete", () => {
    const result = taskReducer(
      { isDialogOpen: false, isConfirmDialogOpen: true, taskToBeUpdated: task },
      { type: "confirmTaskDelete" }
    );
    expect(result).toEqual({
      isDialogOpen: false,
      isConfirmDialogOpen: false,
      taskToBeUpdated: null,
    });
  });
});
