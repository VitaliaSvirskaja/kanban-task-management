import { CreateBoardDto } from "../model/CreateBoardDto";
import { Board } from "../model/Board";
import { UpdateBoardDto } from "../model/UpdateBoardDto";
import { BoardColumn } from "../model/BoardColumn";
import { CreateColumnDto } from "../model/CreateColumnDto";
import { CreateTaskDto } from "../model/CreateTaskDto";
import { Task } from "../model/Task";
import { UpdateTaskDto } from "../model/UpdateTaskDto";
import { SubTask } from "../model/SubTask";
import { CreateSubTaskDto } from "../model/CreateSubTaskDto";
import { UpdateSubTaskDto } from "../model/UpdateSubTaskDto";

const BASE_URL = "http://localhost:8080";

async function createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
  try {
    const response = await fetch(`${BASE_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createBoardDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating a board.");
  }
}

async function deleteBoard(boardID: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/boards/${boardID}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.error(e);
    throw new Error("Error while deleting a board.");
  }
}

async function fetchBoards(): Promise<Array<Board>> {
  try {
    const response = await fetch(`${BASE_URL}/boards`, {
      method: "GET",
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error while fetching boards.");
  }
}

async function updateBoard(
  boardID: number,
  updateBoardDto: UpdateBoardDto
): Promise<Board> {
  try {
    const response = await fetch(`${BASE_URL}/boards/${boardID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBoardDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while updating a board.");
  }
}

async function getColumns(boardID: number): Promise<Array<BoardColumn>> {
  try {
    const response = await fetch(`${BASE_URL}/boards/${boardID}/board-columns`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching board columns.");
  }
}

async function createColumn(
  createColumnDto: CreateColumnDto
): Promise<BoardColumn> {
  try {
    const response = await fetch(`${BASE_URL}/board-columns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createColumnDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating a new board column.");
  }
}

async function createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating a new task.");
  }
}

async function getTasks(boardID: number): Promise<Array<Task>> {
  try {
    const response = await fetch(`${BASE_URL}/board-columns/${boardID}/tasks`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching tasks.");
  }
}

async function updateTask(
  taskID: number,
  updateTaskDto: UpdateTaskDto
): Promise<Board> {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTaskDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while updating a task.");
  }
}

async function getSubTasks(taskID: number): Promise<Array<SubTask>> {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskID}/subtasks`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching subtasks.");
  }
}

async function createSubTask(
  createSubTaskDto: CreateSubTaskDto
): Promise<SubTask> {
  try {
    const response = await fetch(`${BASE_URL}/subtasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createSubTaskDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating a new subtask.");
  }
}

async function updateSubTask(
  subTaskID: number,
  updateSubTaskDto: UpdateSubTaskDto
): Promise<Board> {
  try {
    const response = await fetch(`${BASE_URL}/subtasks/${subTaskID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSubTaskDto),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while updating a subtask.");
  }
}

export const API = {
  createBoard: createBoard,
  deleteBoard: deleteBoard,
  fetchBoards: fetchBoards,
  updateBoard: updateBoard,
  getColumns: getColumns,
  createColumn: createColumn,
  createTask: createTask,
  getTasks: getTasks,
  updateTask: updateTask,
  getSubTasks: getSubTasks,
  createSubTask: createSubTask,
  updateSubTask: updateSubTask,
};
