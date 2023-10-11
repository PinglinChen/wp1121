// songController.ts

/*import { Request, Response } from "express";
import ListModel from "../models/list";
import CardModel from "../models/card";  // 假設您將歌曲儲存在CardModel中

// 每個函數都需要實現具體的邏輯，以下只是大致框架

export const getSongs = async (req: Request, res: Response) => {
    // TODO: 根據req.params.listId獲取特定清單中的所有歌曲
};

export const addSong = async (req: Request, res: Response) => {
    // TODO: 在特定清單中添加新歌曲
};

export const updateSong = async (req: Request, res: Response) => {
    // TODO: 更新特定清單中的歌曲
};

export const deleteSong = async (req: Request, res: Response) => {
    // TODO: 刪除特定清單中的歌曲
};*/

// songController.ts

/*import CardModel from "../models/card";
import { genericErrorHandler } from "../utils/errors";
import type {
  CardData,
  CreateCardPayload,
  CreateCardResponse,
  GetCardResponse,
  UpdateCardPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all songs of a specific list
export const getSongs = async (req: Request<{ listId: string }>, res: Response) => {
  try {
    const { listId } = req.params;
    const songs = await CardModel.find({ list_id: listId });

    return res.status(200).json(songs);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Add a new song to a list
export const addSong = async (
  req: Request<{ listId: string }, never, CreateCardPayload>,
  res: Response<CreateCardResponse>,
) => {
  try {
    const { listId } = req.params;
    const { title, artist, link } = req.body;

    const newSong = await CardModel.create({
      title,
      artist,
      link,
      list_id: listId,
    });

    return res.status(201).json({ id: newSong.id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a song of a list
export const updateSong = async (
  req: Request<{ listId: string; songId: string }, never, UpdateCardPayload>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const { title, artist, link } = req.body;

    const updatedSong = await CardModel.findByIdAndUpdate(
      songId,
      {
        title,
        artist,
        link,
      },
      { new: true },
    );

    if (!updatedSong) {
      return res.status(404).json({ error: "Song ID is not valid" });
    }

    return res.status(200).json(updatedSong);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a song of a list
export const deleteSong = async (
  req: Request<{ listId: string; songId: string }>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const deletedSong = await CardModel.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ error: "Song ID is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*/

/*import SongModel from "../models/songlist";
import { genericErrorHandler } from "../utils/errors";
import type {
  //SongData,
  CreateSongPayload,
  GetSongResponse,
  UpdateSongPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all songs of a specific list
export const getSongs = async (req: Request<{ listId: string }>, res: Response) => {
  try {
    const { listId } = req.params;
    const songs = await SongModel.find({ list_id: listId });

    return res.status(200).json(songs);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Add a new song to a list
/*export const addSong = async (
  req: Request<{ listId: string }, never, CreateSongPayload>,
  res: Response<CreateSongResponse>,
) => {
  try {
    const { listId } = req.params;
    const { title, artist, link } = req.body;

    const newSong = await SongModel.create({
      title,
      artist,
      link,
      list_id: listId,
    });

    return res.status(201).json({ id: newSong.id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*

export const addSong = async (
  req: Request<{ listId: string }, never, CreateSongPayload>,
  res: Response<GetSongResponse>,
) => {
  try {
    const { listId } = req.params;
    const { title, artist, link, imagePath, description } = req.body; // 提取image

    const newSong = await SongModel.create({
      title,
      artist,
      link,
      imagePath,
      list_id: listId,
      description,
    });

    return res.status(201).json({ id: newSong.id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*/


// Update a song of a list
/*export const updateSong = async (
  req: Request<{ listId: string; songId: string }, never, UpdateSongPayload>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const { title, artist, link } = req.body;

    const updatedSong = await SongModel.findByIdAndUpdate(
      songId,
      {
        title,
        artist,
        link,
      },
      { new: true },
    );

    if (!updatedSong) {
      return res.status(404).json({ error: "Song ID is not valid" });
    }

    return res.status(200).json(updatedSong);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*

export const updateSong = async (
  req: Request<{ listId: string; songId: string }, never, UpdateSongPayload>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const { title, artist, link, imagePath, description } = req.body;

    const updatedSong = await SongModel.findByIdAndUpdate(
      songId,
      {
        title,
        artist,
        link,
        imagePath,
        description,
      },
      { new: true },
    );

    if (!updatedSong) {
      return res.status(404).json({ error: "Song ID is not valid" });
    }

    return res.status(200).json(updatedSong);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a song of a list
export const deleteSong = async (
  req: Request<{ listId: string; songId: string }>,
  res: Response,
) => {
  try {
    const { songId } = req.params;
    const deletedSong = await SongModel.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ error: "Song ID is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*/

// controllers/songController.js // might come back later
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

/*export const getLists = async (_: Request, res: Response<GetSongResponse>) => {
  try {
    const lists = await SongModel.find({});
    
    // Calculate the songCount for each list
    const listsToReturnPromises = lists.map(async (list) => {
      return {
        tltle: songs.title,
        artist: songs.artist,
        link: songs.link,
        description: songs.description,
        imagePath: songs.imagePath,
      };
    });

    const listsToReturn = await Promise.all(listsToReturnPromises);

    return res.status(200).json(SongsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*/

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
}; //might come back later

// controllers/songlists.ts
// now
/*import SongList from "../models/songlist";
import { genericErrorHandler } from "../utils/errors";
import type { Request, Response } from "express";
import type { SongData } from "@lib/shared_types";

export const addSong = async (
  req: Request<{ listId: string }, never, SongData>,
  res: Response
) => {
  try {
    const { listId } = req.params;
    const songData = req.body;

    const list = await SongList.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.songs.push(songData);
    await list.save();

    return res.status(201).json(songData);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// ... (Add other CRUD methods for songlists, like getSongs, deleteSong, etc.)
// ... (other imports)

// Get all songs from a list
export const getSongs = async (
  req: Request<{ listId: string }>,
  res: Response
) => {
  try {
    const { listId } = req.params;
    const list = await SongList.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    return res.status(200).json(list.songs);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a song in a list
export const updateSong = async (
  req: Request<{ listId: string, songId: string }, never, SongData>,
  res: Response
) => {
  try {
    const { listId, songId } = req.params;
    const songData = req.body;

    const list = await SongList.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const songIndex = list.songs.findIndex(song => song.id === songId);
    if (songIndex === -1) {
      return res.status(404).json({ error: "Song not found" });
    }

    //list.songs[songIndex] = songData;
    //list.songs.set(songIndex, songData);
    /*const newSong = new Song({...songData});
    list.songs.push(newSong);*
    list.songs[songIndex] = songData;
    await list.save();

    return res.status(200).send("Song updated successfully");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a song from a list
export const deleteSong = async (
  req: Request<{ listId: string, songId: string }>,
  res: Response
) => {
  try {
    const { listId, songId } = req.params;

    const list = await SongList.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.songs = list.songs.filter(song => song.id !== songId);
    await list.save();
    /*const songToDelete = list.songs.id(songId);
    if (songToDelete) {
      songToDelete.remove();
      await list.save();
    }*
    return res.status(200).send("Song deleted successfully");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};*/

/*import SongList from "../models/songlist";
import { Request, Response } from "express";
import { genericErrorHandler } from "../utils/errors";

export const createSongList = async (req: Request, res: Response) => {
  try {
    const newList = new SongList(req.body);
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongLists = async (req: Request, res: Response) => {
  try {
    const lists = await SongList.find({});
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await SongList.findById(id);
    if (!list) {
      return res.status(404).json({ error: "Song list not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 類似的，您可以添加其他控制器方法，例如updateSongList和deleteSongList。*/

