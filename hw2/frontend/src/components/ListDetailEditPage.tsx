import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Song = {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [listImage, setListImage] = useState<string>("");
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      // For demo purposes, use mock data
      setSongs([
        { title: "Song A", artist: "Artist A", link: "https://www.google.com/?client=avast-a-1", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);
      setDescription("");
      //const listImageUrl = await fetchListImageFromServer(listId);
      //setListImage(listImageUrl);
    }
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.title === songTitle ? { ...song, selected: isSelected } : song
      )
    );
  };

  const [title, setTitle] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setListImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSong = async () => {
    if (songRef.current && artistRef.current && linkRef.current) {
      const newSongData = {
        title: songRef.current.value,
        artist: artistRef.current.value,
        link: linkRef.current.value,
        selected: false
      };
      setSongs(prevSongs => [...prevSongs, newSongData]);
    }
    setShowAddDialog(false);
  };
  
  const handleDeleteSelectedSongs = () => {
    const selected = songs.filter(song => song.selected);
    if (!selected.length) {
      alert("請勾選歌曲");
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmDeleteSelectedSongs = async () => {
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
  };

  const handleImageClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-3/4 p-4 flex">
        <div onClick={handleImageClick}>
          {listImage ? (
            <img src={listImage} alt="" className="mr-4 w-32 h-32 object-cover" />
          ) : (
            <div className="mr-4 w-32 h-32 bg-gray-300 flex items-center justify-center cursor-pointer">
              <span>上傳圖片</span>
            </div>
          )}
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
          <div className="ml-4 flex flex-col">
            <TextField
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <br></br>
            <TextField
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className="mb-4"
            />
          <br></br>
            <ul className="mb-4">
              {songs.map((song) => (
                <li key={song.title}>
                  <input 
                    type="checkbox"
                    checked={song.selected}
                    onChange={(e) => handleSongSelect(song.title, e.target.checked)}
                  />
                  Title: {song.title}, Artist: {song.artist}, Link: <a href={song.link} target="_blank" rel="noopener noreferrer">{song.link}</a>
                </li>
              ))}
            </ul>
            <DialogActions className="mb-4">
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
        {showAddDialog && (
          <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
            <DialogTitle>Add a song</DialogTitle>
            <DialogContent>
              <TextField
                inputRef={songRef}
                label="Song Name"
                variant="outlined"
                sx={{ mt: 2 }}
                autoFocus
              />
              <TextField
                inputRef={artistRef}
                label="Artist"
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <TextField
                inputRef={linkRef}
                label="Link"
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <button onClick={handleAddSong}>Add Song</button>
              <button onClick={() => setShowAddDialog(false)}>Cancel</button>
            </DialogActions>
          </Dialog>
        )}
        {showDeleteDialog && (
          <div>
            <h3>是否確定刪除</h3>
            <ul>
              {songs.filter(song => song.selected).map(song => (
                <li key={song.title}>{song.title}</li>
              ))}
            </ul>
            <Button variant="contained" className="w-80" onClick={confirmDeleteSelectedSongs}>確定刪除</Button>
            <Button variant="contained" className="w-80" onClick={() => setShowDeleteDialog(false)}>取消</Button>
          </div>
        )}
      </div>
    </>
  );
}