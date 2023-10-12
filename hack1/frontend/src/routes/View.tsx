import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import ViewFooter from '@/components/ViewFooter';
import { usePost } from '@/contexts/PostContext';
import { useUser } from '@/contexts/UserContext';

const View = (): React.ReactNode => {
  const { user } = useUser();
  const { getPostByIndex, votePost, numPosts } = usePost();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const post = getPostByIndex(selectedIndex);

  const handleNextClick = useCallback(() => {
    if (selectedIndex < numPosts - 1) {
      setSelectedIndex(prev => prev + 1);
    }
  }, [selectedIndex, numPosts]);

  const handlePrevClick = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(prev => prev - 1);
    }
  }, [selectedIndex]);

  /*const hasUpvoted = user && post ?.upvotes.includes(user._id);
  const hasDownvoted = user && post?.downvotes.includes(user._id);*/
  //const hasUpvoted = !!user && post?.upvotes.includes(user._id);
  //const hasDownvoted = !!user && post?.downvotes.includes(user._id);
  const hasUpvoted = !!user && !!post && post.upvotes.includes(user._id);
  const hasDownvoted = !!user && !!post && post.downvotes.includes(user._id);

  const handleVoteClick = (vote: 'upvote' | 'downvote') => {
    if (post && user) {
      votePost(selectedIndex, user._id, vote);
    }
  };

  const handleKeyPress = (e: { code: string }) => {
    if (e.code === 'ArrowRight') {
      handleNextClick();
    } else if (e.code === 'ArrowLeft') {
      handlePrevClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNextClick, handlePrevClick]);

  return post ? (
    <>
      <PostCard post={post} />
      <div className="mt-auto">
        <ViewFooter
          downvoteClickHandler={() => handleVoteClick('downvote')}
          upvoteClickHandler={() => handleVoteClick('upvote')}
          hasDownvoted={hasDownvoted}
          hasUpvoted={hasUpvoted}
          nextClickHandler={handleNextClick}
          prevClickHandler={handlePrevClick}
          totalVotes={post.upvotes.length - post.downvotes.length}
          loading={false}
        />
      </div>
    </>
  ) : (
    <div className="flex h-full items-center justify-center">
      There are no posts to view.
    </div>
  );
};

export default View;


