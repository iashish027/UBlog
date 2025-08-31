import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link
      to="/blog"
      state={{
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        username: post.username,
      }}
      className="block border p-4 rounded shadow hover:shadow-lg transition"
    >
      <img src={post.image} alt="Post" className="mb-2" />
      <h2 className="text-[1.5rem] font-bold ">{post.title}</h2>
    </Link>
  );
}

export default PostCard;
