// The beauty of using TypeScript on both ends of the application is that we can
// share types between the client and the server very easily. This is a great way
// to keep the client and server in sync and avoid bugs. JavaScript makes you move
// fast, but TypeScript makes you move fast and not break things.

// A "type" can be defined with the `type` keyword or the `interface` keyword.
// They may seem similar, but there are some differences. For more information,
// see: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// A general rule of thumb is to always use `type` unless you have a good reason
// to use `interface`. `interface` is more powerful, at the cost of baring more
// footguns.
export type SongData = {
  title: string;
  artist: string;
  link: string;
  imagePath: string;
  description: string;
};

export type GetSongsResponse = SongData[];

export type GetSongResponse = SongData;

export type CreateSongPayload = Omit<SongData, "id">;

export type UpdateSongPayload = Partial<Omit<SongData, "id">>;

export type UpdateSongResponse = "OK";

export type DeleteSongResponse = "OK";

export type CardData = {
  id: string;
  title: string;
  description: string;
  list_id: string;
};

export type ListData = {
  id: string;
  name: string;
  description: string;
  cards: CardData[];
  imagePath: string;
  songCount: number;
};

export type CreateListPayload = {
  name: string;
  description: string;
  imagePath: string | null;
  songCount: number;
};

export type GetCardsResponse = CardData[];

export type GetCardResponse = CardData;

export type CreateCardPayload = Omit<CardData, "id">;

export type CreateCardResponse = Pick<CardData, "id">;

export type UpdateCardPayload = Partial<Omit<CardData, "id">>;

export type UpdateCardResponse = "OK";

export type DeleteCardResponse = "OK";

export type GetListsResponse = Omit<ListData, "cards" >[];

export type CreateListResponse = Pick<ListData, "id">;

export type UpdateListPayload = Partial<Omit<ListData, "id" | "cards" >>;

export type UpdateListResponse = "OK";

export type DeleteListResponse = "OK";
