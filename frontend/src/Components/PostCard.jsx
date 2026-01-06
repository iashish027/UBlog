import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function PostCard({ post, onDelete }) {
  const location = useLocation();
  const isUserPosts = location.pathname === "/dashboard";
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/deletepost`, {
        data: { postId: post._id },
        withCredentials: true,
      });
      if (onDelete) onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className="block border p-4 rounded shadow hover:shadow-lg transition dark:bg-slate-800">
      <img src={post.image} alt="Post" className="mb-2" />
      <h2 className="text-[1.5rem] font-bold ">{post.title}</h2>
      <Link
        to="/blog"
        state={{
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          username: post.username,
        }}
        className="text-blue-500 hover:underline"
      >
        Read More
      </Link>
      {isUserPosts && (
        <>
          <button
            onClick={() => setShowPopup(true)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-4 rounded shadow-lg text-center">
                <p className="mb-4">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2  rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostCard;
