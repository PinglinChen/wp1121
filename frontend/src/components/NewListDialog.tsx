/*import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    try {
      await createList({ name: textfieldRef.current?.value ?? "" });
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={textfieldRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}*/

/*import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";
import { useState } from "react";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { fetchLists } = useCards();

  /*const handleAddList = async () => {
    try {
      await createList({ 
        name: nameRef.current?.value ?? "", 
        description: descriptionRef.current?.value ?? ""
      });
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };*

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await createList(formData);  // Ensure your API can handle multipart/form-data
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
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
        <br></br>
        <TextField
          inputRef={descriptionRef}
          label="List Description"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
          //multiline
        />
        <br></br>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}*/

/*import { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (data: any) => Promise<void>;
  fetchLists: () => void;
};

const NewListDialog: React.FC<NewListDialogProps> = ({ open, onClose, createList, fetchLists }) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await createList(formData);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } else {
      setImagePreview(null);
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
        {imagePreview && (
          <img src={imagePreview} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />
        )}
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'block', marginTop: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewListDialog;*/

/*import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
//import { createList as createListAPI } from "@/utils/client";
import { createList } from "@/utils/client";
//import { createList, fetchLists } from "./path_to_your_api_functions"; // 請根據您的專案結構替換這一行

type CreateListPayload = any;

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload | FormData) => Promise<any>;
  fetchLists: () => void;  // 假設 fetchLists 沒有參數並且返回 void
  //createList: (input: CreateListPayload | FormData) => Promise<any>;
};

export default function NewListDialog({ open, onClose, /*createList*//*: createListFromProps* }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await createList/*FromProps*(formData);
      fetchLists();
      setSelectedImage(null);
      setImagePreviewUrl(null);
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleCloseAndReset = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseAndReset/*onClose*}>
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
}*/

/*import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type CreateListPayload = any;

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload | FormData) => Promise<any>;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await createList(formData);
      fetchLists();
      setSelectedImage(null);
      setImagePreviewUrl(null);
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
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
}*/

/*import { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type CreateListPayload = any;

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload | FormData) => Promise<any>;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  useEffect(() => {
    if (open) {
      if (nameRef.current) nameRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  }, [open]);

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await createList(formData);
      fetchLists();
      setSelectedImage(null);
      setImagePreviewUrl(null);
    } catch (error) {
      //alert("Error: Failed to create list");
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
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
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
}*/   //current

/*import { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  useEffect(() => {
    if (open) {
      if (nameRef.current) nameRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  }, [open]);

  const handleAddList = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current?.value ?? "");
    formData.append('description', descriptionRef.current?.value ?? "");
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await createList(formData);
      const list = response.data;

      fetchLists();
      setSelectedImage(null);
      setImagePreviewUrl(list.imagePath);  // Use the returned imagePath from the server
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
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
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
}*/

/*import { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type CreateListPayload = any;

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload) => Promise<any>;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  useEffect(() => {
    if (open) {
      if (nameRef.current) nameRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      //setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  }, [open]);

  const handleAddList = async () => {
    const listData = {
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      image: imagePreviewUrl || "",
    };

    try {
      await createList(listData);
      fetchLists();
      //setSelectedImage(null);
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
      setSelectedImage(file);
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
}*/

/*import { useEffect, useState, useRef } from "react";
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
};

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
  createList: (input: CreateListPayload) => Promise<any>;
  fetchLists: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { fetchLists } = useCards();

  useEffect(() => {
    if (open) {
      if (nameRef.current) nameRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      setImagePreviewUrl(null);
    }
  }, [open]);

  /*const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch('/path/to/upload/endpoint', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data.imageUrl;
  };*
  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch('updateList', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json(); // assuming server returns a JSON error message
      throw new Error(`Image upload failed! Server says: ${errorData.message}`);
    }    
    const data = await response.json();
    return data.imageUrl;
  };  

  const handleAddList = async () => {
    /*let imageUrl = imagePreviewUrl;
    if (imagePreviewUrl?.startsWith('data:image')) {
      const blob = dataURLtoBlob(imagePreviewUrl);
        imageUrl = await uploadImage(blob);
    }*/
    /*const listData = {
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      imagePath: imagePreviewUrl || "",
    };*
    let imageUrl = imagePreviewUrl;
    if (imagePreviewUrl?.startsWith('data:image')) {
      const file = dataURLtoFile(imagePreviewUrl, "uploaded-image.jpg");  // <-- Specify a filename
      imageUrl = await uploadImage(file);
    }
    const listData = {
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      imagePath: imageUrl || "",  // <-- Use imageUrl here
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

function dataURLtoFile(dataurl: string, filename: string): File {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream',
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

/*function dataURLtoBlob(dataurl: string) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream',
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}*
*/

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
  createList: (input: CreateListPayload) => Promise<any>;
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
