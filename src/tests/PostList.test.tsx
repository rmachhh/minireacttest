/** @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PostList } from "../components/PostList";
import * as api from "../api/posts";

//mock the api
vi.mock("../api/posts");

// Sample data
const mockPosts = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" },
  { id: 3, title: "Another Post", content: "This is another post" },
];

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PostList Search Filtering", () => {
  it("filters posts based on search term", async () => {
    vi.mocked(api.fetchPosts).mockResolvedValueOnce(mockPosts);
    render(<PostList searchTerm="First" isModalViewToggle={false} />);
    const firstPost = await screen.findByText("First Post");
    expect(firstPost).toBeInTheDocument();
    const secondPost = screen.queryByText("Second Post");
    expect(secondPost).toBeNull();
  });

  it("is case insensitive in filtering", async () => {
    vi.mocked(api.fetchPosts).mockResolvedValueOnce(mockPosts);
    render(<PostList searchTerm="second" isModalViewToggle={false} />);
    const secondPost = await screen.findByText("Second Post");
    expect(secondPost).toBeInTheDocument();
    const firstPost = screen.queryByText("First Post");
    expect(firstPost).toBeNull();
  });
  it("shows all posts when search term is empty", async () => {
    vi.mocked(api.fetchPosts).mockResolvedValueOnce(mockPosts);
    render(<PostList searchTerm="" isModalViewToggle={false} />);
    const firstPost = await screen.findByText("First Post");
    const secondPost = await screen.findByText("Second Post");
    expect(firstPost).toBeInTheDocument();
    expect(secondPost).toBeInTheDocument();
  });

  it("shows empty state when no matches are found", async () => {
    vi.mocked(api.fetchPosts).mockResolvedValueOnce(mockPosts);
    render(<PostList searchTerm="Nonexistent" isModalViewToggle={false} />);
    const emptyState = await screen.findByText("No posts found");
    expect(emptyState).toBeInTheDocument();
  });
});
