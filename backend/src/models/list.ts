import mongoose from "mongoose";
import type { Types } from "mongoose";

import type { ListData } from "@lib/shared_types";

// In `ListData`, we have `id` as a string and `cards` as an array of `CardData`, but in the database, we want them both to be stored as an ObjectId.
interface ListDocument
  extends Omit<ListData, "id" | "cards">,
    mongoose.Document {
  cards: Types.ObjectId[];
}

interface ListModel extends mongoose.Model<ListDocument> {}

// We enforce the type by adding `<ListDocument>` after `mongoose.Schema`.
const ListSchema = new mongoose.Schema<ListDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const List = mongoose.model<ListDocument, ListModel>("List", ListSchema);
export default List;