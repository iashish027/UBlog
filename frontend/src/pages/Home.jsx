import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../Components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/api/posts/getposts?page=${page}&limit=20`
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="p-4">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-4 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded mr-2"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
