import { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type CreateListPayload = {
  name: string;
  description: string;
  imagePath: string | null;
  songCount: number;
};

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload) => Promise<unknown>;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [songCount] = useState(0);
  const { fetchLists } = useCards();

  useEffect(() => {
    if (open) {
      if (nameRef.current) nameRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      setImagePreviewUrl(null);
    }
  }, [open]);

  const handleAddList = async () => {
    if (!nameRef.current?.value) {
      alert("請輸入標題");
      return;
    }
    if (!descriptionRef.current?.value) {
      alert("請輸入敘述");
      return;
    }
  
    const listData = {
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      imagePath: imagePreviewUrl || "",
      songCount
    };
  
    try {
      await createList(listData);
      fetchLists();
      setImagePreviewUrl(null);
    } catch (error) {
      console.error(error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseData = error.response as { data?: string };
        alert(`Error: Failed to create list. ${responseData.data || ''}`);
      } else {
        alert('Error: Failed to create list.');
      }
    } finally {
      onClose();
    }
  };  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={nameRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
        <TextField
          inputRef={descriptionRef}
          label="List Description"
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        {imagePreviewUrl && (
          <img src={imagePreviewUrl} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
