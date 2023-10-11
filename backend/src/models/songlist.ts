//import type { SongData } from "@lib/shared_types";
/*import mongoose from "mongoose";
import type { Types } from "mongoose";

interface SongDocument extends mongoose.Document {
  title: string;
  artist: string;
  link: string;
  list_id: Types.ObjectId;
  description: string;
  image: string;
}

interface SongModel extends mongoose.Model<SongDocument> {}

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
    list_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
  }
);

const Song = mongoose.model<SongDocument, SongModel>("Song", SongSchema);
export default Song;*/

//import type { SongData } from "@lib/shared_types";
/*import mongoose from "mongoose";
import type { Types } from "mongoose";

//interface SongDocument extends Omit<SongData, "id">, mongoose.Document {}
interface SongDocument extends mongoose.Document {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
  listId: Types.ObjectId;
  description: string;
  image: string;
}

interface SongModel extends mongoose.Model<SongDocument> {}

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
    selected: {
      type: Boolean,
      default: false,
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model<SongDocument, SongModel>("Song", SongSchema);
export default Song;*/
//current songlist, might come back later

/*import mongoose from "mongoose";

export interface SongData {
  title: string;
  artist: string;
  link: string;
}

const SongSchema = new mongoose.Schema({
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
});

export default mongoose.model<SongData>("Song", SongSchema);*/

// models/songlist.ts

/*import type { SongData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

interface SongDocument extends Omit<SongData, "id">, mongoose.Document {}

interface ListDocument
  extends Omit<SongData, "songs">,
    mongoose.Document {
  songs: Types.ObjectId[];
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
  },
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
  },
);

const SongList = mongoose.model<ListDocument, SongListModel>(
  "SongList",
  ListSchema
);

export default SongList;*/

// models/songlist.ts
// might come back later
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

export default SongList;  // might come back later


// models/songlist.ts
//now
/*import type { SongData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

interface SongDocument extends Omit<SongData, 'id'>, mongoose.Document {}

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

export default SongList;*/

/*import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
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
});

const SongListSchema = new mongoose.Schema({
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
    default: "",
  },
  songs: [SongSchema],
});

const SongList = mongoose.model("SongList", SongListSchema);
export default SongList;
*/
