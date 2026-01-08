import { useEffect, useState } from "react";
import PostCard from "../features/post/PostCard";
import { getPosts } from "../services/api";
import PageNavButtons from "../Components/Common/PageNavButtons";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(page);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
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
      <PageNavButtons page = {page} totalPages = {totalPages} setPage = {setPage}/>
    </div>
  );
}
