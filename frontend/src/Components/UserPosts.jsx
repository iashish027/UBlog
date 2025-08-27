import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser) {
        try {
          console.log(currentUser);
          const response = await axios.get(
            `/api/posts/getposts?userId=${currentUser._id}`
          );
          setPosts(response.data.posts);
          console.log(response.data.posts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [currentUser]);

  return (
    <div className="p-3">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/CreatePost">
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Post
          </button>
        </Link>
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <img src={post.image} alt="Post" className="mb-2" />
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
