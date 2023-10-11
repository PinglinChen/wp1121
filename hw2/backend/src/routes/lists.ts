import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} from "../controllers/lists";

import {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
} from "../controllers/songlists";

import express from "express";

const router = express.Router();

// Song related routes
router.get("/:listId/songs", getSongs);
router.post("/:listId/songs", addSong);
router.put("/:listId/songs/:songId", updateSong);
router.delete("/:listId/songs/:songId", deleteSong);

// List related routes
router.get("/", getLists);
router.post("/", createList);
router.get("/:listId", getList);
router.put("/:listId", updateList);
router.delete("/:listId", deleteList);

export default router;
