import React from "react";
import { Link } from "react-router";
export default function Logo({ size }) {
  return (
    <div>
      <Link to="/" className={`text-${size} l font-semibold`}>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 rounded-lg text-white">
          U
        </span>
        Blog
      </Link>
    </div>
  );
}
