import { CreateBoardDto } from "../model/CreateBoardDto";
import { Board } from "../model/Board";
import { UpdateBoardDto } from "../model/UpdateBoardDto";

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

export const API = {
  createBoard: createBoard,
  deleteBoard: deleteBoard,
  fetchBoards: fetchBoards,
  updateBoard: updateBoard,
};
