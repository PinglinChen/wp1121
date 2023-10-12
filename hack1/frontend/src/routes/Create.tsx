import React, { useState, type FormEvent } from 'react';
import Editor from '@monaco-editor/react';
import { LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { usePost } from '@/contexts/PostContext';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

const DEFAULT_TITLE = 'index.js';
const DEFAULT_CODE = `console.log('hello world!')`;

const Create = (): React.ReactNode => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { user } = useUser();
  const {
    getPostIndicesByUserId,
    getPostByIndex,
    createPost,
    updatePost,
    numPosts,
  } = usePost();

  const { toast } = useToast();

  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [code, setCode] = useState<string>(DEFAULT_CODE);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedIndex === -1) {
      // create new post
      createPost(title, code); // Call the createPost function with title and code
      setSelectedIndex(numPosts); // Update selectedIndex with the latest post
      toast({
        description: 'File Created Successfully',
        variant: 'default',
      });
    } else {
      // edit old post
      updatePost(selectedIndex, title, code); // Call the updatePost function
      toast({
        description: 'File Updated Successfully',
        variant: 'default',
      });
    }
  };

  const handleNewFileClick = () => {
    setSelectedIndex(-1);
    setTitle(DEFAULT_TITLE);
    setCode(DEFAULT_CODE);
  };

  return (
    <div className="flex h-auto overflow-y-scroll">
      <div className="flex w-xs flex-col gap-0 p-2">
        <div className="flex w-full justify-between p-[2px]">
          <span>{`~/${user && user.username}/published/`}</span>
          <span className="cursor-pointer" onClick={handleNewFileClick}>
            +
          </span>
        </div>
        {selectedIndex === -1 && (
          <span className="flex cursor-pointer items-center gap-[6px] truncate bg-zinc-800 p-[2px]">
            <img
              className="inline-block h-3 w-3"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png"
              alt="JS Icon"
            ></img>
            (unsaved) {title}
          </span>
        )}
        {user &&
          getPostIndicesByUserId(user._id).map((postIndex) => {
            const post = getPostByIndex(postIndex);
            if (post === null) return <></>;
            return (
              <span
                key={post._id}
                data-testid={`filetab-${post._id}`}
                className={cn(
                  'flex cursor-pointer items-center gap-[6px] truncate p-[2px]',
                  selectedIndex === postIndex && 'bg-zinc-800',
                  selectedIndex !== postIndex && 'hover:bg-zinc-700',
                )}
                onClick={() => {
                  setSelectedIndex(postIndex);
                  setCode(post.content);
                  setTitle(post.title);
                }}
              >
                <img
                  className="inline-block h-3 w-3"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png"
                  alt="JS Icon"
                ></img>
                {post.title} {/* Display post title */}
              </span>
            );
          })}
      </div>
      <div className="h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="m-2 flex items-center gap-[2px]"
        >
          <Input
            type="text"
            value={title} // Bind title state to the input value
            onChange={(e) => setTitle(e.target.value)} // Update title state on change
            id="title"
            placeholder="File name"
            className="h-9 rounded-[2px] border-background p-2.5 focus-visible:border-button focus-visible:ring-0 focus-visible:ring-offset-0"
            name="title"
            data-testid="filename"
          />
          <Button data-testid="post-btn" size="sm" className="rounded-[2px]">
            Post
          </Button>
        </form>
        <div data-testid="editor">
          <Editor
            width="100%"
            height="30rem"
            defaultLanguage="javascript"
            language="javascript"
            theme="vs-dark"
            value={code} // Bind code state to the editor value
            //onChange={(newValue) => setCode(newValue)} // Update code state on change
            onChange={(newValue) => {
              if (typeof newValue === 'string') {
                setCode(newValue);
              }
            }}            
            loading={
              <div className="flex items-center justify-center gap-2">
                <LoaderIcon className="h-4.5 w-4.5 animate-spin" />
                Loading...
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Create;

