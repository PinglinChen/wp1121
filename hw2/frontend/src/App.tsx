import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import ListDetailEditPage from "@/components/ListDetailEditPage";
import useCards from "@/hooks/useCards";
import { createList as createListAPI } from "./utils/client";
import type { CreateListPayload } from "@lib/shared_types";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

function MainPage() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLists = lists.filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const handleCreateList = async (listData: CreateListPayload) => {
    try {
      await createListAPI(listData);
      fetchLists();
      setNewListDialogOpen(false);
    } catch (error) {
      console.error(error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseData = error.response as { data?: string };
        alert(`Error: Failed to create list. ${responseData.data || ''}`);
      } else {
        alert('Error: Failed to create list.');
      }
    }
  };
  
  return (
    <>
      <HeaderBar />
      <main className="mx-auto max-h-full px-24 py-12">
        <h2 className="text-2xl mb-4">My Playlists</h2>
        <DialogContent>
        <TextField
          inputRef={searchRef}
          label="search for a song list"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }}
          autoFocus
        />
        </DialogContent>
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setNewListDialogOpen(true)}
          >
            <AddIcon className="mr-2" />
            Add
          </Button>
          <Button
            variant="contained"
            className="w-80"
            onClick={() => {
              setIsDeleting(!isDeleting);
            }}
          >
            {isDeleting ? 'DONE' : 'DELETE'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.map((list) => (
            <div key={list.id}>
            <div>{list.songCount}2 songs</div>
            <CardList {...list} showDelete={isDeleting} />
            </div>
          ))}
        </div>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
          createList={handleCreateList}
          fetchLists={fetchLists}
        />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list/:listId/edit" element={<ListDetailEditPage />} />
      </Routes>
    </Router>
  );
}
export default App;

