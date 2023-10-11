import type {
  CreateCardPayload,
  CreateCardResponse,
  CreateListPayload,
  CreateListResponse,
  GetCardsResponse,
  GetListsResponse,
  UpdateCardPayload,
  UpdateCardResponse,
  DeleteCardResponse,
  DeleteListResponse,
  UpdateListPayload,
  UpdateListResponse,
  GetSongsResponse,
  UpdateSongPayload,
  UpdateSongResponse,
  DeleteSongResponse,
} from "@lib/shared_types";
import axios from "axios";

import { env } from "./env";

const client = axios.create({
  baseURL: env.VITE_API_URL,
});

export function getLists() {
  return client.get<GetListsResponse>("/lists").catch(err => {
    console.error("Error fetching lists:", err.response?.data || err.message);
    throw err;
  });
}

export function getCards() {
  return client.get<GetCardsResponse>("/cards");
}

export function createList(input: CreateListPayload) {
  return client
    .post<CreateListResponse>("/lists", input)
    .catch(err => {
      console.error("Error creating a list:", err.response?.data || err.message);
      throw err;
    });
}

export function createCard(input: CreateCardPayload) {
  return client.post<CreateCardResponse>("/cards", input);
}

export function updateCard(id: string, input: UpdateCardPayload) {
  return client.put<UpdateCardResponse>(`/cards/${id}`, input);
}

export function updateList(id: string, input: UpdateListPayload) {
  return client.put<UpdateListResponse>(`/lists/${id}`, input);
}

export function deleteCard(id: string) {
  return client.delete<DeleteCardResponse>(`/cards/${id}`);
}

export function deleteList(id: string) {
  return client.delete<DeleteListResponse>(`/lists/${id}`);
}

export function getSongsOfList(listId: string) {
  return client.get<GetSongsResponse>(`/lists/${listId}/songs`);
}

export function updateSong(listId: string, songId: string, input: UpdateSongPayload) {
  return client.put<UpdateSongResponse>(`/lists/${listId}/songs/${songId}`, input);
}

export function deleteSong(listId: string, songId: string) {
  return client.delete<DeleteSongResponse>(`/lists/${listId}/songs/${songId}`);
}