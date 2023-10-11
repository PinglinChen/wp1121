// controllers/songController.js
import SongModel from "../models/songlist"; 
import { genericErrorHandler } from "../utils/errors";
import type { Request, Response } from "express";
import type {
  //CreateSongPayload,
  //CreateSongResponse,
  GetSongResponse,
  UpdateSongPayload,
} from "@lib/shared_types";

// Add a song to a list
export const addSong = async (
  req: Request<{ listId: string }>,
  res: Response
) => {
  try {
    const { listId } = req.params;
    const songData = { ...req.body, listId };
    const newSong = await SongModel.create(songData);
    return res.status(201).json(newSong);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get all songs from a list
export const getSongs = async (
  req: Request<{ listId: string }, never, GetSongResponse>,
  res: Response
) => {
  try {
    const { listId } = req.params;
    const songs = await SongModel.find({ listId });
    return res.status(200).json(songs);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a song of a list
export const updateSong = async (
  req: Request<{ songId: string }, never, UpdateSongPayload>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const { title, artist, link, imagePath, description } = req.body;
    await SongModel.findByIdAndUpdate(/*{songId}*/
    songId,
      {
        title,
        artist,
        link,
        imagePath,
        description
      },
      { new: true },
    );
    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a song from a list
export const deleteSong = async (
  req: Request<{ songId: string }>,
  res: Response
) => {
  try {
    const { songId } = req.params;
    await SongModel.findByIdAndDelete(songId);
    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

