import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { getMyPosts } from "../../services/api";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser) {
        try {
          const data = await getMyPosts(page);

          setPosts(data.posts);
          setTotalPages(data.totalPages);
          setError(null);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setError("Failed to fetch posts. Please try again later.");
        }
      }
    };

    fetchPosts();
  }, [currentUser, page]);

  return (
    <div className="p-3"> 
      {/* Upper part - Posts heading , Create Post button */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>

        <Link to="/CreatePost">
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Post
          </button>
        </Link>

      </div>

      {/* Bottom part User Post cards  */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      
      {/* Page Navigation buttons */}
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

export default UserPosts;
