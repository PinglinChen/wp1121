import CardModel from "../models/card";
import ListModel from "../models/list";
import { genericErrorHandler } from "../utils/errors";
import type {
  CardData,
  CreateListPayload,
  CreateListResponse,
  GetListsResponse,
  ListData,
  //SongData,
  UpdateListPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all lists
export const getLists = async (_: Request, res: Response<GetListsResponse>) => {
  try {
    const lists = await ListModel.find({});
    
    // Calculate the songCount for each list
    const listsToReturnPromises = lists.map(async (list) => {
      const songCount = await CardModel.countDocuments({ list_id: list.id });
      return {
        id: list.id,
        name: list.name,
        description: list.description,
        imagePath: list.imagePath,
        songCount,
      };
    });

    const listsToReturn = await Promise.all(listsToReturnPromises);

    return res.status(200).json(listsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a list
export const getList = async (
  req: Request<{ id: string }>,
  res: Response<ListData | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const list = await ListModel.findById(id).populate("cards");
    if (!list) {
      return res.status(404).json({ error: "id is not valid" });
    }

    const songCount = await ListModel.countDocuments({ list_id: id });

    return res.status(200).json({
      id: list.id,
      name: list.name,
      description: list.description,
      imagePath: list.imagePath,
      songCount,
      cards: list.cards as unknown as CardData[],
      //songs: list.cards as unknown as SongData[],
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a list
export const createList = async (
  req: Request<never, never, CreateListPayload>,
  res: Response<CreateListResponse>,
) => {
  try {
    //const { id } = await ListModel.create(req.body);
    const newList = await ListModel.create(req.body);
    const id = newList._id;
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a list
export const updateList = async (
  req: Request<{ id: string }, never, UpdateListPayload>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name, description, imagePath, songCount } = req.body; // Updated to include description and imagePath

    // Update the list
    const updatedList = await ListModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        imagePath,
        songCount,
      },
      { new: true },
    );

    // If the list is not found, return 404
    if (!updatedList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a list
export const deleteList = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // Create a transaction
  const session = await ListModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedList = await ListModel.findByIdAndDelete(id).session(session);
    if (!deletedList) {
      throw new Error("id is not valid");
    }
    await CardModel.deleteMany({ list_id: id }).session(session);
    await session.commitTransaction();
    res.status(200).send("OK");
  } catch (error) {
    await session.abortTransaction();
    genericErrorHandler(error, res);
  } finally {
    session.endSession();
  }
};
