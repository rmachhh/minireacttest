import type { Post } from "./types";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com";

//fetch posts from the API
export const fetchPosts = async (signal?: AbortSignal): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  //map the api response to post type
  const posts: Post[] = data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.body,
    expandable: item.body.length > 80,
  }));

  //return only first 30 posts
  return posts.slice(0, 30);
};
