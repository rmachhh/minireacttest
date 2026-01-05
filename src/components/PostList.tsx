import React, { useCallback, useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../api/types";
import { PostModal } from "./PostModal";

interface PostListProps {
  searchTerm: string;
  isModalViewToggle: boolean;
}

export const PostList: React.FC<PostListProps> = ({
  searchTerm,
  isModalViewToggle,
}) => {
  const { posts, loading, error, reload } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  //filtered posts based on search term (case insensitive)
  const filteredPosts = useMemo(() => {
    return posts.filter((post: Post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  //on modal close handler
  const onCloseModal = useCallback(() => {
    setSelectedPost(null);
  }, []);

  //handle the selection of post
  const handleSelect = useCallback(
    (id: number) => {
      const found = posts.find((p) => p.id === id);
      if (found) setSelectedPost(found);
    },
    [posts]
  );

  //handle the reload action
  const onReload = useCallback(() => {
    reload();
  }, [reload]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Error loading posts..</p>
        <button className="btn btn-error mt-4" onClick={onReload}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: Post) => (
            <PostCard
              id={post.id}
              key={post.id}
              title={post.title}
              content={post.content}
              expandable={post.expandable}
              isModalViewToggle={isModalViewToggle}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <div className="text-center py-10 bg-base-200 rounded-box">
            <p className="text-lg font-semibold">No posts found</p>
            <p className="text-base-content/60">
              Try adjusting your search term to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {isModalViewToggle && (
        <PostModal
          isOpen={selectedPost !== null}
          title={selectedPost?.title || ""}
          content={selectedPost?.content || ""}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};
