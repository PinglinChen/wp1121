// models/songlist.ts

import type { SongData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

interface SongDocument extends SongData, mongoose.Document {}

interface ListDocument extends mongoose.Document {
  title: string;
  description: string;
  imagePath?: string;
  songs: Types.Array<SongDocument>;
}

interface SongListModel extends mongoose.Model<ListDocument> {}

const SongSchema = new mongoose.Schema<SongDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ListSchema = new mongoose.Schema<ListDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: false,
    },
    songs: [SongSchema],
  },
  {
    timestamps: true,
  }
);

const SongList = mongoose.model<ListDocument, SongListModel>(
  "SongList",
  ListSchema
);

export default SongList;
