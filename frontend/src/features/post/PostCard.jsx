import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deletePost } from "../../services/api";

function PostCard({ post, onDelete }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserPosts = location.pathname === "/dashboard";
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      if (onDelete) onDelete(post._id);
    } catch (error) {
      alert("Failed to delete the post. Please try again.");
    } finally {
      setShowPopup(false);
    }
  };

  const handleCardClick = () => {
    
    navigate('/blog', {
      state: {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        username: post.user.username,
      }
    });
  };

  return (
    <div className="block border p-4 rounded shadow hover:shadow-lg transition dark:bg-slate-800 min-h-[400px] cursor-pointer" onClick={handleCardClick}>
      <div className="w-full h-48 mb-2 overflow-hidden rounded">
        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-[1.5rem] font-bold ">{post.title}</h2>
      {isUserPosts && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl text-center border border-gray-300 dark:border-gray-600 max-w-sm w-full mx-4">
                <p className="mb-6 text-gray-800 dark:text-gray-200 font-medium">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-medium shadow-md"
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
