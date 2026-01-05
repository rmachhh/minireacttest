import { useState, useEffect, useCallback } from "react";
import type { Post } from "../api/types";
import { fetchPosts } from "../api/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //function to load posts
  const loadPosts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPosts(signal);
      setPosts(data);
    } catch (err: Error | any) {
      if (err.name === "AbortError") return;
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    //abort controller for fetch
    const controller = new AbortController();
    loadPosts(controller.signal);

    //cleanup
    return () => {
      controller.abort();
    };
  }, [loadPosts]);

  return { posts, loading, error, reload: loadPosts };
};
