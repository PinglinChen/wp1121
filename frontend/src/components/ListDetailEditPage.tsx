// ListDetailEditPage.jsx
/*import React from 'react';
import { useParams } from 'react-router-dom';

function ListDetailEditPage() {
  const { id } = useParams();

  // Fetch the list data using the id or use a context/state to get the data

  return (
    <div>
      <img src={list.imagePath} alt={list.name} />
      <h2>{list.name}</h2>
      <p>{list.description}</p>
      
      {/* Add form fields for editing name, description, etc. *//*}*/
      
      /*<button>ADD</button>
      <button>DELETE</button>
    </div>
  );
}*/

/*export default ListDetailEditPage;*/

/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

type ListDetailProps = {
  id: string;
  // ... 其他的属性如name, description, imagePath等
};

export default function ListDetailEditPage() {
  const { id } = useParams<{ id: string }>();
  const [listDetail, setListDetail] = useState<ListDetailProps | null>(null);

  useEffect(() => {
    // TODO: 使用API来获取此ID的播放清单详情并设置到state中
    fetch(`/api/lists/${id}`)
      .then((res) => res.json())
      .then((data) => setListDetail(data));
  }, [id]);

  const handleEdit = () => {
    // TODO: 实现编辑功能，例如使用API来更新播放清单的信息
  };

  if (!listDetail) return <div>Loading...</div>;

  return (
    <div>
      <img src={listDetail.imagePath} alt={listDetail.name} />
      <TextField label="Name" value={listDetail.name} />
      <TextField label="Description" value={listDetail.description} />
      <Button onClick={handleEdit}>Edit</Button>
      {/* ... 加入其他的按钮和功能 *}*/
    /*</div>
  );
}*/

/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

type ListDetailProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
};

export default function ListDetailEditPage() {
  const { id } = useParams<{ id: string }>();
  const [listDetail, setListDetail] = useState<ListDetailProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/lists/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setListDetail(data))
      .catch((error) => setError(error.message));
  }, [id]);

  const handleChange = (field: keyof ListDetailProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (listDetail) {
      setListDetail({
        ...listDetail,
        [field]: event.target.value,
      });
    }
  };

  const handleEdit = () => {
    // TODO: 实现编辑功能，例如使用API来更新播放清单的信息
  };

  if (error) return <div>Error: {error}</div>;
  if (!listDetail) return <div>Loading...</div>;

  return (
    <div>
      <img src={listDetail.imagePath} alt={listDetail.name} />
      <TextField label="Name" value={listDetail.name} onChange={handleChange("name")} />
      <TextField label="Description" value={listDetail.description} onChange={handleChange("description")} />
      <Button onClick={handleEdit}>Edit</Button>
      {/* ... 加入其他的按钮和功能 }
    </div>
  );
}*/

/*import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, ListItemText, ListItem, List } from "@mui/material";

type Song = {
    id: string;
    name: string;
    artist: string;
    link: string;
};

export default function ListDetailEdit() {
    const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
    const [songs, setSongs] = useState<Song[]>([]); // Assume songs fetched from database
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addSongDialogOpen, setAddSongDialogOpen] = useState(false);

    const handleDeleteSongs = () => {
        if (selectedSongs.length === 0) {
            alert("請勾選歌曲");
            return;
        }
        setDeleteDialogOpen(true);
    };

    const confirmDeleteSongs = () => {
        // TODO: Implement deletion logic with API
        setDeleteDialogOpen(false);
        setSelectedSongs([]); // Clear selection
    };

    return (
        <>
          <HeaderBar />
            /*<AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      WP Music
                  </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', padding: '16px' }}>
                <img src="your-list-image-path" alt="list-name" style={{ width: '200px', height: '200px', marginRight: '16px' }} />
                <div>
                    <Typography variant="h5">List Name</Typography>
                    <Typography>Description here...</Typography>
                </div>
            </div>
            <div style={{ padding: '16px' }}>
                {songs.map(song => (
                    <div key={song.id}>
                        <Checkbox
                            checked={selectedSongs.includes(song.id)}
                            onChange={() => {
                                if (selectedSongs.includes(song.id)) {
                                    setSelectedSongs(prev => prev.filter(id => id !== song.id));
                                } else {
                                    setSelectedSongs(prev => [...prev, song.id]);
                                }
                            }}
                        />
                        <span>{song.name} - {song.artist}</span>
                    </div>
                ))}
            </div>
            <Button onClick={() => setAddSongDialogOpen(true)}>ADD</Button>
            <Button onClick={handleDeleteSongs}>DELETE</Button>

            {/* Delete Dialog *}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>刪除歌曲</DialogTitle>
                <DialogContent>
                    <List>
                        {selectedSongs.map(id => {
                            const song = songs.find(s => s.id === id);
                            return song ? (
                                <ListItem key={song.id}>
                                    <ListItemText primary={`${song.name} - ${song.artist}`} />
                                </ListItem>
                            ) : null;
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDeleteSongs} color="primary">確定刪除</Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">取消</Button>
                </DialogActions>
            </Dialog>

            {/* Add Song Dialog - You can expand on this based on your requirements *}
            <Dialog open={addSongDialogOpen} onClose={() => setAddSongDialogOpen(false)}>
                <DialogTitle>新增歌曲</DialogTitle>
                <DialogContent>
                    {/* Add inputs for song name, artist, link here *}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        // TODO: Add logic to add song
                        setAddSongDialogOpen(false);
                    }} color="primary">確定</Button>
                    <Button onClick={() => setAddSongDialogOpen(false)} color="primary">取消</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}*/

/*import { useState } from "react";
//import { useEffect, useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";

function ListDetailPage() {
  // 假设从API或其他地方获取的数据
  const [listDetail, setListDetail] = useState({
    name: "Sample Playlist",
    description: "This is a sample playlist description.",
    imagePath: "/path/to/image.jpg", // 你的图片路径
  });

  // TODO: 实现删除和添加的逻辑
  const handleDelete = () => {
    console.log("Delete List");
  };

  const handleAdd = () => {
    console.log("Add Card to List");
  };

  return (
    <div>
      <HeaderBar />
      <Container>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img
                src={listDetail.imagePath}
                alt={listDetail.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">{listDetail.name}</Typography>
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {listDetail.description}
              </Typography>
              <div style={{ marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                  ADD
                </Button>
                <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }} onClick={handleDelete}>
                  DELETE
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default ListDetailPage;*/

/*import React from 'react';
import HeaderBar from "@/components/HeaderBar";
import Button from "@mui/material/Button";
import { Typography, Paper, Grid, Box } from "@mui/material";
import { useLocation } from 'react-router-dom';

function PlaylistDetailPage() {
  const location = useLocation();
  const list = location.state.list;  // 假設你是透過react-router的state傳遞list資料

  // TODO: 如果使用API獲取list詳細資料，請在這裡添加API呼叫和狀態管理。

  return (
    <>
      <HeaderBar />
      <main className="mx-auto max-h-full px-24 py-12">
        <h2 className="text-2xl mb-4">Playlist Detail</h2>
        <Paper className="p-6">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <img src={list.imagePath} alt={list.name} className="w-full h-40 object-cover mb-4" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">{list.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {list.description}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button variant="contained" className="mr-2">
                  ADD
                </Button>
                <Button variant="outlined" color="error">
                  DELETE
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
}

export default PlaylistDetailPage;*/

/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import HeaderBar from "@/components/HeaderBar";
import { updateList, deleteList } from "@/utils/client";

export default function ListDetailEditPage() {
  const { id } = useParams<{ id: string }>();
  const [listDetail, setListDetail] = useState<ListDetailProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // TODO: 使用API来获取此ID的播放清单详情并设置到state中
    fetch(`/api/lists/${id}`)
      .then((res) => res.json())
      .then((data) => setListDetail(data));
  }, [id]);

  const handleEdit = async () => {
    try {
      // 更新播放清單的信息
      await updateList(id, {
        name: listDetail.name,
        description: listDetail.description,
        imagePath: listDetail.imagePath,
      });
      setIsEditing(false);
    } catch (error) {
      alert("Error: Failed to update list");
    }
  };

  const handleDelete = async () => {
    try {
      // 删除播放清单
      await deleteList(id);
      // 返回到主页或其他适当的操作
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  if (!listDetail) return <div>Loading...</div>;

  return (
    <div>
      <HeaderBar />
      <img src={listDetail.imagePath} alt={listDetail.name} />
      {isEditing ? (
        <TextField
          label="Name"
          value={listDetail.name}
          onChange={(e) =>
            setListDetail({ ...listDetail, name: e.target.value })
          }
        />
      ) : (
        <div>{listDetail.name}</div>
      )}
      {isEditing ? (
        <TextField
          label="Description"
          value={listDetail.description}
          onChange={(e) =>
            setListDetail({ ...listDetail, description: e.target.value })
          }
        />
      ) : (
        <div>{listDetail.description}</div>
      )}
      {isEditing ? (
        <Button onClick={handleEdit}>Save</Button>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      )}
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}*/

/*import { useState, useEffect } from "react";
//import { Add as AddIcon} from "@mui/icons-material";
//import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import HeaderBar from "@/components/HeaderBar";

type ListDetailProps = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  // ... 其他的属性如name, description, imagePath等
};

//export default function ListDetailEditPage() {
function ListDetailEditPage({ listId }: { listId: any }) {
  const { id } = useParams<{ id: string }>();
  const [listDetail, setListDetail] = useState<ListDetailProps | null>(null);

  useEffect(() => {
    // TODO: 使用API来获取此ID的播放清单详情并设置到state中
    fetch(`/api/lists/${id}`)
      .then((res) => res.json())
      .then((data) => setListDetail(data));
  }, [id]);

  const handleEdit = () => {
    // TODO: 实现编辑功能，例如使用API来更新播放清单的信息
  };

  if (!listDetail) return <div>Loading...</div>;

  return (
    <div>
      <HeaderBar /> {/* 加入HeaderBar組件 *}
      <img src={listDetail.imagePath} alt={listDetail.name} />
      <TextField label="Name" value={listDetail.name} />
      <TextField label="Description" value={listDetail.description} />
      <Button onClick={handleEdit}>Edit</Button>
      {/* ... 加入其他的按钮和功能 *}
    </div>
  );
  return <div>{listId}</div>;
}
export default ListDetailEditPage;*/

/*import { useState } from "react";
import { TextField, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Link } from "@mui/material";

function ListDetailEditPage({ listId }: { listId: any }) {
    const [listTitle, setListTitle] = useState<string>("Playlist Title");
    const [listDescription, setListDescription] = useState<string>("Playlist Description");
    const [songs, setSongs] = useState<Array<{title: string, artist: string, link: string, selected: boolean}>>([
        // Example songs data structure
        { title: "Song1", artist: "Artist1", link: "http://example.com", selected: false },
        { title: "Song2", artist: "Artist2", link: "http://example.com", selected: false },
    ]);

    // Functions for editing list details, songs, adding new songs, etc. would go here

    return (
        <div className="list-detail-page">
            <div className="playlist-info">
                <img src="path_to_image.jpg" alt="Playlist" />
                <TextField value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
                <TextField value={listDescription} onChange={(e) => setListDescription(e.target.value)} multiline />
            </div>

            <div className="songs-list">
                {songs.map((song, index) => (
                    <div className="song-row" key={index}>
                        <Checkbox
                            checked={song.selected}
                            onChange={() => {
                                const newSongs = [...songs];
                                newSongs[index].selected = !song.selected;
                                setSongs(newSongs);
                            }}
                        />
                        <TextField value={song.title} onChange={(e) => {
                            const newSongs = [...songs];
                            newSongs[index].title = e.target.value;
                            setSongs(newSongs);
                        }} />
                        <TextField value={song.artist} onChange={(e) => {
                            const newSongs = [...songs];
                            newSongs[index].artist = e.target.value;
                            setSongs(newSongs);
                        }} />
                        <Link href={song.link} target="_blank" rel="noopener noreferrer">Open Link</Link>
                    </div>
                ))}
            </div>

            <Button onClick={() => setAddDialogOpen(true)}>Add</Button>
            <Button onClick={() => setDeleteDialogOpen(true)}>Delete</Button>

            {/* Add Dialog *}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Song</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Artist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Link"
                        value={newSong.link}
                        onChange={(e) => setNewSong({ ...newSong, link: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSong} color="primary">
                        Add
                    </Button>
                    <Button onClick={() => setAddDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog *}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the selected songs?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteSongs} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    return <div>{listId}</div>;
}

export default ListDetailEditPage;*/

/*import { useState } from "react";
import {TextField, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Link, Table, TableBody,
  TableCell, TableHead, TableRow, } from "@mui/material";
import HeaderBar from "@/components/HeaderBar";

type Song = {
  selected: boolean;
  title: string;
  artist: string;
  link: string;
};

function ListDetailEditPage() {
    /*const [songs, setSongs] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [newSong, setNewSong] = useState({ title: "", artist: "", link: "" });

    const handleAddSong = () => {
        setSongs([...songs, { ...newSong, selected: false }]);
        setNewSong({ title: "", artist: "", link: "" });
        setAddDialogOpen(false);
    };

    const handleDeleteSongs = () => {
        setSongs(songs.filter(song => !song.selected));
        setDeleteDialogOpen(false);
    };*

    const [songs, setSongs] = useState<Song[]>([]);
    const [newSong, setNewSong] = useState({ title: "", artist: "", link: "" });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddSong = () => {
      setSongs((prevSongs) => [
        ...prevSongs,
        { ...newSong, selected: false },
      ]);
      setNewSong({ title: "", artist: "", link: "" });
      setDialogOpen(false);
    };

    return (
    <>
      <HeaderBar />
      <main className="mx-auto max-h-full px-24 py-12"></main>
        <div className="list-detail-page">
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setAddDialogOpen(true)}
          > Add
          </Button>
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setAddDialogOpen(true)}
          > Delete
          </Button>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Artist</TableCell>
                      <TableCell>Link</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {songs.map(song => (
                        <TableRow key={song.title}>
                            <TableCell><Checkbox checked={song.selected} onChange={() => {
                                song.selected = !song.selected;
                                setSongs([...songs]);
                            }} /></TableCell>
                            <TableCell>{song.title}</TableCell>
                            <TableCell>{song.artist}</TableCell>
                            <TableCell><Link href={song.link} target="_blank">Open Link</Link></TableCell>
                        </TableRow>
                    ))}
              </TableBody>
            </Table>

            {/* Add Dialog *}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Song</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Artist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Link"
                        value={newSong.link}
                        onChange={(e) => setNewSong({ ...newSong, link: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSong} color="primary">
                        Add
                    </Button>
                    <Button onClick={() => setAddDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog *}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the selected songs?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteSongs} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    return <div>{listId}</div>;
}

export default ListDetailEditPage;*/

/*import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, Table, TableBody,
  TableCell, TableHead, TableRow, } from "@mui/material";

type ListDetailEditPageProps = {
  listId: string;
};  

type Song = {
  selected: boolean;
  title: string;
  artist: string;
  link: string;
};

export default function ListDetailEditPage({ listId }: ListDetailEditPageProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "", link: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddSong = () => {
    setSongs((prevSongs) => [
      ...prevSongs,
      { ...newSong, selected: false },
    ]);
    setNewSong({ title: "", artist: "", link: "" });
    setDialogOpen(false);
  };

  return (
    <div>
      {/* 歌曲列表 *}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={song.selected}
                  onChange={() => {
                    const newSongs = [...songs];
                    newSongs[index].selected = !newSongs[index].selected;
                    setSongs(newSongs);
                  }}
                />
              </TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <a href={song.link} target="_blank" rel="noreferrer">
                  Open Link
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 新增歌曲按鈕和彈窗 *}
      <Button onClick={() => setDialogOpen(true)}>ADD</Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a new song</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={newSong.title}
            onChange={(e) => setNewSong((prev) => ({ ...prev, title: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong((prev) => ({ ...prev, artist: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Link"
            value={newSong.link}
            onChange={(e) => setNewSong((prev) => ({ ...prev, link: e.target.value }))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSong}>Add</Button>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* 刪除歌曲按鈕 *}
      <Button onClick={() => {
        const filteredSongs = songs.filter(song => !song.selected);
        setSongs(filteredSongs);
      }}>DELETE</Button>
    </div>
  );
  return <div>{listId}</div>;
}*/

/*import { useState, useEffect } from "react";

type Song = {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

type ListDetailEditPageProps = {
  listId: string;
};

export default function ListDetailEditPage({ listId }: ListDetailEditPageProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/lists/${listId}`);
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    }
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSelectedSongs((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, songTitle];
      } else {
        return prevSelected.filter((title) => title !== songTitle);
      }
    });
  };

  const handleDeleteSelectedSongs = () => {
    // TODO: Implement the logic to delete selected songs from the list
    console.log("Deleting selected songs:", selectedSongs);
  };

  return (
    <div>
      <h2>Song List for List ID: {listId}</h2>
      
      <ul>
        {songs.map((song) => (
          <li key={song.title}>
            <input 
              type="checkbox"
              checked={song.selected}
              onChange={(e) => handleSongSelect(song.title, e.target.checked)}
            />
            Title: {song.title}, Artist: {song.artist}, Link: {song.link}
          </li>
        ))}
      </ul>

      <button onClick={handleDeleteSelectedSongs}>Delete Selected Songs</button>
    </div>
  );
}*/

/*import { useState, useEffect } from "react";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type Song = {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

type NewSongDialogProps = {
  open: boolean;
  onClose: () => void;
};

/*type ListDetailEditPageProps = {
  listId: string;
};*

export default function ListDetailEditPage(/*{ open, onClose }: NewSongDialogProps*//*{ listId }: ListDetailEditPageProps*) {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '', link: '' });
  const navigate = useNavigate();
  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  formData.append('song', songRef.current?.value ?? "");
  formData.append('artist', artistRef.current?.value ?? "");
  formData.append('link', linkRef.current?.value ?? "");
  
  useEffect(() => {
    async function fetchData() {
      // Fetch songs for the given list ID
      // For now, this is mock data.
      setSongs([
        { title: "Song A", artist: "Artist A", link: "link-a", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);
    }
    
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSelectedSongs((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, songTitle];
      } else {
        return prevSelected.filter((title) => title !== songTitle);
      }
    });
  };

  const handleAddSong = () => {
    // TODO: Save the song to the database
    setSongs(prevSongs => [...prevSongs, { ...newSong, selected: false }]);
    setShowAddDialog(false);
  };

  const handleDeleteSelectedSongs = () => {
    if (!selectedSongs.length) {
      alert("請勾選歌曲");
      return;
    }

    setShowDeleteDialog(true);
  };

  const confirmDeleteSelectedSongs = () => {
    // TODO: Delete the selected songs from the database
    setSongs(prevSongs => prevSongs.filter(song => !selectedSongs.includes(song.title)));
    setShowDeleteDialog(false);
    setSelectedSongs([]);
  };

  return (
   <>
    <HeaderBar />
    <div>
      {/*<h2>Song List for List ID: {listId}</h2>*}
      <DialogActions>
        <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
        <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
      </DialogActions>
      <ul>
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

      {showAddDialog && (
        <div>
          <input value={newSong.title} onChange={e => setNewSong(prev => ({ ...prev, title: e.target.value }))} placeholder="Song Title" />
          <input value={newSong.artist} onChange={e => setNewSong(prev => ({ ...prev, artist: e.target.value }))} placeholder="Artist" />
          <input value={newSong.link} onChange={e => setNewSong(prev => ({ ...prev, link: e.target.value }))} placeholder="Link" />
          <Dialog open={open} onClose={onClose}>
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
              autoFocus
            />
            <TextField
              inputRef={linkRef}
              label="Link"
              variant="outlined"
              sx={{ mt: 2 }}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <button onClick={handleAddSong}>Add Song</button>
            <button onClick={() => setShowAddDialog(false)}>Cancel</button>
          </DialogActions>
        </Dialog>
        </div>
      )}

      {showDeleteDialog && (
        <div>
          <h3>是否確定刪除</h3>
          <ul>
            {selectedSongs.map(title => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <Button variant="contained"
            className="w-80"  onClick={confirmDeleteSelectedSongs}>確定刪除</Button>
          <Button variant="contained"
            className="w-80"  onClick={() => setShowDeleteDialog(false)}>取消</Button>
        </div>
      )}
      <DialogActions><Button onClick={() => navigate('/')}>Finish</Button></DialogActions>
    </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

type Song = {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newSong] = useState({ title: '', artist: '', link: '' });
  
  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch songs for the given list ID
      // For now, this is mock data.
      setSongs([
        { title: "Song A", artist: "Artist A", link: "link-a", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);
    }
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSelectedSongs((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, songTitle];
      } else {
        return prevSelected.filter((title) => title !== songTitle);
      }
    });
  };

  const handleAddSong = () => {
    setSongs(prevSongs => [...prevSongs, { ...newSong, selected: false }]);
    setShowAddDialog(false);
  };

  const handleDeleteSelectedSongs = () => {
    if (!selectedSongs.length) {
      alert("請勾選歌曲");
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmDeleteSelectedSongs = () => {
    setSongs(prevSongs => prevSongs.filter(song => !selectedSongs.includes(song.title)));
    setShowDeleteDialog(false);
    setSelectedSongs([]);
  };

  return (
   <>
    <HeaderBar />
    <div>
      <DialogActions>
        <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
        <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
      </DialogActions>
      <ul>
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
          <Button onClick={handleAddSong}>Add Song</Button>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {showDeleteDialog && (
        <div>
          <h3>是否確定刪除</h3>
          <ul>
            {selectedSongs.map(title => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <Button variant="contained"
            className="w-80"  onClick={confirmDeleteSelectedSongs}>確定刪除</Button>
          <Button variant="contained"
            className="w-80"  onClick={() => setShowDeleteDialog(false)}>取消</Button>
        </div>
      )}
      <DialogActions>
        <Button onClick={() => navigate('/')}>Finish</Button>
      </DialogActions>
    </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type Song = {
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch songs for the given list ID
      // Mock data for now.
      setSongs([
        { title: "Song A", artist: "Artist A", link: "link-a", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);
    }
    
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSelectedSongs((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, songTitle];
      } else {
        return prevSelected.filter((title) => title !== songTitle);
      }
    });
  };

  const handleAddSong = () => {
    const newSongData = {
      title: songRef.current?.value ?? "",
      artist: artistRef.current?.value ?? "",
      link: linkRef.current?.value ?? "",
      selected: false
    };

    // Update the songs state
    setSongs(prevSongs => [...prevSongs, newSongData]);
    
    // Optionally clear the inputs
    if(songRef.current) songRef.current.value = "";
    if(artistRef.current) artistRef.current.value = "";
    if(linkRef.current) linkRef.current.value = "";

    setShowAddDialog(false);
  };

  const handleDeleteSelectedSongs = () => {
    if (!selectedSongs.length) {
      alert("請勾選歌曲");
      return;
    }

    setShowDeleteDialog(true);
  };

  const confirmDeleteSelectedSongs = () => {
    setSongs(prevSongs => prevSongs.filter(song => !selectedSongs.includes(song.title)));
    setShowDeleteDialog(false);
    setSelectedSongs([]);
  };

  return (
   <>
    <HeaderBar />
    <div>
      <DialogActions>
        <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
        <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
      </DialogActions>
      <ul>
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
            <Button onClick={handleAddSong}>Add Song</Button>
            <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      {showDeleteDialog && (
        <div>
          <h3>是否確定刪除</h3>
          <ul>
            {selectedSongs.map(title => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <Button variant="contained" className="w-80" onClick={confirmDeleteSelectedSongs}>確定刪除</Button>
          <Button variant="contained" className="w-80" onClick={() => setShowDeleteDialog(false)}>取消</Button>
        </div>
      )}
      <DialogActions><Button onClick={() => navigate('/')}>Finish</Button></DialogActions>
    </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

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
  const navigate = useNavigate();
  
  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState<string>(""); // 儲存清單描述
  const [listImage, setListImage] = useState<string | null>(null); // 假設列表圖片URL存儲在此

  useEffect(() => {
    async function fetchData() {
      // Fetch songs for the given list ID
      // For now, this is mock data.
      setSongs([
        { title: "Song A", artist: "Artist A", link: "link-a", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);
      setListImage("/path/to/your/image.jpg"); // 更新圖片URL
      setDescription("這是播放清單的描述。"); // 更新清單描述
    }
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSongs((prevSongs) => 
      prevSongs.map((song) => 
        song.title === songTitle ? { ...song, selected: isSelected } : song
      )
    );
  };

  const handleAddSong = () => {
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

  const confirmDeleteSelectedSongs = () => {
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
  };

  return (
    <>
      <HeaderBar />
      <div>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
          <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
        </DialogActions>
        <ul>
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
        <DialogActions>
          <Button onClick={() => navigate('/')}>Finish</Button>
        </DialogActions>
      </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
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
  const [listImage, setListImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch songs for the given list ID
      // For now, this is mock data.
      setSongs([
        { title: "Song A", artist: "Artist A", link: "link-a", selected: false },
        { title: "Song B", artist: "Artist B", link: "link-b", selected: false }
      ]);

      // 假設這是從您的API或數據源擷取到的清單圖片和描述
      setListImage("/path/to/your/image.jpg"); // 更新圖片URL
      setDescription("");
    }
    fetchData();
  }, [listId]);

  const handleSongSelect = (songTitle: string, isSelected: boolean) => {
    setSongs((prevSongs) => 
      prevSongs.map((song) => 
        song.title === songTitle ? { ...song, selected: isSelected } : song
      )
    );
  };

  const handleAddSong = () => {
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

  const confirmDeleteSelectedSongs = () => {
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
  };
  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-1/4 p-4">
          {listImage && <img src={listImage} alt="清單圖片" className="w-full h-auto" />}
        </div>
        <div className="w-3/4 p-4">
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          {/* 從這裡開始是您先前的代碼 *}
          <div className="mt-4">
            <DialogActions>
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={handleDeleteSelectedSongs}>DELETE</Button>
            </DialogActions>
            <ul>
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
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// 假设这些是对应的API方法
import { getSongsFromAPI, addSongToAPI, deleteSongFromAPI } from "@/utils/client";

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [listImage, setListImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const songsFromAPI = await getSongsFromAPI(listId);
        setSongs(songsFromAPI);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    }
    fetchData();
  }, [listId]);

  const handleAddSong = async () => {
    if (songRef.current && artistRef.current && linkRef.current) {
      const newSongData = {
        title: songRef.current.value,
        artist: artistRef.current.value,
        link: linkRef.current.value
      };

      try {
        await addSongToAPI(listId, newSongData);
        setSongs(prevSongs => [...prevSongs, newSongData]);
      } catch (error) {
        console.error("Error adding song:", error);
      }
    }
    setShowAddDialog(false);
  };

  const confirmDeleteSelectedSongs = async () => {
    const songsToDelete = songs.filter(song => song.selected);
    try {
      for (const song of songsToDelete) {
        await deleteSongFromAPI(listId, song.title);
      }
      setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    } catch (error) {
      console.error("Error deleting songs:", error);
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-1/4 p-4">
          {listImage && <img src={listImage} alt="" className="w-full h-auto" />}
        </div>
        <div className="w-3/4 p-4">
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <div className="mt-4">
            <DialogActions>
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={confirmDeleteSelectedSongs}>DELETE</Button>
            </DialogActions>
            <ul>
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
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}*/

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
  //const [listImage, setListImage] = useState<string | null>(null);

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
/*async function fetchListImageFromServer(listId: string) {
  const response = await fetch(`/api/lists/${listId}/image`);
  const data = await response.json();
  return data.imageUrl;
}*/



/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getSongsOfList, createSong, deleteSong } from "@/utils/client";
//import { getLists } from "@/utils/client"


type Song = {
  id: string;
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

type ListData = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  cards: Song[];
};

async function getListFromServer(id: string): Promise<ListData> {
  const response = await fetch(`/api/lists${id}`);
  const data: ListData = await response.json();
  return data;
}

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [listImage, setListImage] = useState<string>("");
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  /*useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const responseSongs = await getSongsOfList(listId);
        const songsWithSelected = responseSongs.data.map(song => ({ ...song, selected: false }));
        setSongs(songsWithSelected);
        const listData = await getLists(); // 取決於如何從API中獲得數據
        setListImage(listData.imagePath); 
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    }
    fetchData();
  }, [listId]);*/

  /*useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const responseSongs = await getSongsOfList(listId);
        const songsWithSelected = responseSongs.data.map(song => ({ ...song, selected: false }));
        setSongs(songsWithSelected);
        
        const listData = await getLists(listId);  // 從伺服器取得這個播放清單的詳細資料，包括圖片 URL
        setListImage(listData.imagePath); // 更新圖片 URL
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    }
    fetchData();
  }, [listId]);*
  
  useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const listData = await getListFromServer(listId); 
        setListImage(listData.imagePath); // 更新圖片 URL
        setSongs(listData.cards.map(card => ({ ...card, selected: false })));
        setDescription(listData.description); 
      } catch (error) {
        console.error("Failed to fetch list details:", error);
      }
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
  
  /*const handleAddSong = async () => {
    if (!listId) return;  // Ensure listId is defined

    if (songRef.current && artistRef.current && linkRef.current) {
        const newSongData = {
            list_id: listId,  // Adding the listId
            title: songRef.current.value,
            artist: artistRef.current.value,
            link: linkRef.current.value
            image: listImage
        };
        try {
            const response = await createSong(listId, newSongData);
            const addedSong = { ...response.data, selected: false } as Song;
            setSongs(prevSongs => [...prevSongs, addedSong]);
        } catch (error) {
            console.error("Failed to add song:", error);
        }
    }
    setShowAddDialog(false);
  };*

  const handleAddSong = async () => {
    if (!listId) return;  // Ensure listId is defined
  
    if (songRef.current && artistRef.current && linkRef.current) {
      const newSongData = {
        list_id: listId,  // Adding the listId
        title: songRef.current.value,
        artist: artistRef.current.value,
        link: linkRef.current.value,
        image: listImage,      // Add listImage to newSongData
        description: description, // Add description to newSongData
      };
      try {
        const response = await createSong(listId, newSongData);
        const addedSong = { ...response.data, selected: false } as Song;
        setSongs(prevSongs => [...prevSongs, addedSong]);
      } catch (error) {
        console.error("Failed to add song:", error);
      }
    }
    setShowAddDialog(false);
  };
  
  const confirmDeleteSelectedSongs = async () => {
    if (!listId) { // Ensure listId is defined
      console.error("List ID is not defined.");
      return;
    }
    const songsToDelete = songs.filter(song => song.selected);
    for (let song of songsToDelete) {
      try {
        await deleteSong(listId, song.id);
      } catch (error) {
        console.error("Failed to delete song:", error);
      }
    }
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
};

  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-3/4 p-4">
          <img src={listImage} alt="" className="mr-4 w-32 h-32 object-cover" />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <div className="mt-4">
            <DialogActions>
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={() => setShowDeleteDialog(true)}>DELETE</Button>
            </DialogActions>
            <ul>
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
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}*/   //might come back later 2

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getSongsOfList, createSong, deleteSong } from "@/utils/client";

type Song = {
  id: string;
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
  const [listImage, setListImage] = useState<string>("");  // State for list image URL
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const responseSongs = await getSongsOfList(listId);
        setListImage(responseSongs.image);  // Assume your API returns the image URL in the response
        const songsWithSelected = responseSongs.data.map(song => ({ ...song, selected: false }));
        setSongs(songsWithSelected);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
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
  
  const handleAddSong = async () => {
    if (!listId) return;  // Ensure listId is defined

    if (songRef.current && artistRef.current && linkRef.current) {
        const newSongData = {
            list_id: listId,  // Adding the listId
            title: songRef.current.value,
            artist: artistRef.current.value,
            link: linkRef.current.value
        };
        try {
            const response = await createSong(listId, newSongData);
            const addedSong = { ...response.data, selected: false } as Song;
            setSongs(prevSongs => [...prevSongs, addedSong]);
        } catch (error) {
            console.error("Failed to add song:", error);
        }
    }
    setShowAddDialog(false);
};

  const confirmDeleteSelectedSongs = async () => {
    if (!listId) { // Ensure listId is defined
      console.error("List ID is not defined.");
      return;
    }
    const songsToDelete = songs.filter(song => song.selected);
    for (let song of songsToDelete) {
      try {
        await deleteSong(listId, song.id);
      } catch (error) {
        console.error("Failed to delete song:", error);
      }
    }
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
};

return (
  <>
    <HeaderBar />
    <div className="flex">
      <div className="w-3/4 p-4">
        <div className="flex items-center">
          <img src={listImage} alt="List Cover" className="mr-4 w-32 h-32 object-cover" />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          </div>
          {/* ... [Rest of the UI remains unchanged] *}
        </div>
      </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createSong, deleteSong } from "@/utils/client";

type Song = {
  id: string;
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

type ListData = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  cards: Song[];
};

async function getListFromServer(id: string): Promise<ListData> {
  const response = await fetch(`/api/list/${id}`);
  const data: ListData = await response.json();
  return data;
}

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [listImage, setListImage] = useState<string>("");
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const listData = await getListFromServer(listId); 
        setListImage(listData.imagePath);
        setSongs(listData.cards.map(card => ({ ...card, selected: false })));
        setDescription(listData.description); 
      } catch (error) {
        console.error("Failed to fetch list details:", error);
      }
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

  const handleAddSong = async () => {
    if (!listId) return;  // Ensure listId is defined
  
    if (songRef.current && artistRef.current && linkRef.current) {
      const newSongData = {
        list_id: listId,
        title: songRef.current.value,
        artist: artistRef.current.value,
        link: linkRef.current.value,
        image: listImage,
        description: description,
      };
      try {
        const response = await createSong(listId, newSongData);
        const addedSong = { ...response.data, selected: false } as Song;
        setSongs(prevSongs => [...prevSongs, addedSong]);
      } catch (error) {
        console.error("Failed to add song:", error);
      }
    }
    setShowAddDialog(false);
  };
  
  const confirmDeleteSelectedSongs = async () => {
    if (!listId) {
      console.error("List ID is not defined.");
      return;
    }
    const songsToDelete = songs.filter(song => song.selected);
    for (let song of songsToDelete) {
      try {
        await deleteSong(listId, song.id);
      } catch (error) {
        console.error("Failed to delete song:", error);
      }
    }
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
  };

  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-3/4 p-4">
          <img src={listImage} alt="" className="mr-4 w-32 h-32 object-cover" />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <div className="mt-4">
            <DialogActions>
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={() => setShowDeleteDialog(true)}>DELETE</Button>
            </DialogActions>
            <ul>
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
                  <Button onClick={handleAddSong}>Add Song</Button>
                  <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
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
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}*/

/*import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createSong, deleteSong } from "@/utils/client";

type Song = {
  id: string;
  title: string;
  artist: string;
  link: string;
  selected: boolean;
};

type ListData = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  cards: Song[];
};

async function getListFromServer(id: string): Promise<ListData> {
  const response = await fetch(`/api/list/${id}`);
  const data: ListData = await response.json();
  return data;
}

export default function ListDetailEditPage() {
  const { listId } = useParams<{ listId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [listImage, setListImage] = useState<string>("");
  const navigate = useNavigate();

  const songRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!listId) {
        console.error("List ID is not defined.");
        return;
      }
      try {
        const listData = await getListFromServer(listId); 
        setListImage(listData.imagePath);
        setSongs(listData.cards.map(card => ({ ...card, selected: false })));
        setDescription(listData.description); 
      } catch (error) {
        console.error("Failed to fetch list details:", error);
      }
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
    if (!listId) return;
  
    if (songRef.current && artistRef.current && linkRef.current) {
      const newSongData = {
        list_id: listId,
        title: songRef.current.value,
        artist: artistRef.current.value,
        link: linkRef.current.value,
        image: listImage,
        description: description,
      };
      try {
        const response = await createSong(listId, newSongData);
        const addedSong = { ...response.data, selected: false } as Song;
        setSongs(prevSongs => [...prevSongs, addedSong]);
      } catch (error) {
        console.error("Failed to add song:", error);
      }
    }
    setShowAddDialog(false);
  };
  
  const confirmDeleteSelectedSongs = async () => {
    if (!listId) {
      console.error("List ID is not defined.");
      return;
    }
    const songsToDelete = songs.filter(song => song.selected);
    for (let song of songsToDelete) {
      try {
        await deleteSong(listId, song.id);
      } catch (error) {
        console.error("Failed to delete song:", error);
      }
    }
    setSongs(prevSongs => prevSongs.filter(song => !song.selected));
    setShowDeleteDialog(false);
  };

  return (
    <>
      <HeaderBar />
      <div className="flex">
        <div className="w-3/4 p-4 flex">
          <div>
            {listImage && <img src={listImage} alt="" className="mr-4 w-32 h-32 object-cover" />}
            <input type="file" accept="image/*" onChange={handleImageChange} style={{display: listImage ? 'none' : 'block'}} />
          </div>
          <div className="ml-4">
            <TextField
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant="outlined"
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className="ml-4"
            />
          </div>
        </div>
        <div className="w-3/4 p-4">
          <div className="mt-4">
            <DialogActions>
              <Button onClick={() => setShowAddDialog(true)}>ADD</Button>
              <Button onClick={() => setShowDeleteDialog(true)}>DELETE</Button>
            </DialogActions>
            <ul>
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
                  <Button onClick={handleAddSong}>Add Song</Button>
                  <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
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
            <DialogActions>
              <Button onClick={() => navigate('/')}>Finish</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}*/

