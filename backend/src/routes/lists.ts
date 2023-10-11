/*import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} from "../controllers/lists";
import express from "express";

const router = express.Router();

// GET /api/lists
router.get("/", getLists);
// GET /api/lists/:id
router.get("/:id", getList);
// POST /api/lists
router.post("/", createList);
// PUT /api/lists/:id
router.put("/:id", updateList);
// DELETE /api/lists/:id
router.delete("/:id", deleteList);

// export the router
export default router;*/

/*import {
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

// List related routes
router.get("/", getLists);
router.post("/", createList);
router.get("/:id", getList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

// Song related routes
router.get("/:listId/songs", getSongs);
router.post("/:listId/songs", addSong);
router.put("/:listId/songs/:songId", updateSong);
router.delete("/:listId/songs/:songId", deleteSong);

export default router;*/

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
