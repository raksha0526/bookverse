import { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import { Link } from "react-router-dom";

export default function Explore() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Explore Reviews
      </h1>

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow rounded p-4 mb-4"
        >
          <h2 className="text-2xl font-bold">
            📖 {post.title}
          </h2>

          <p className="text-gray-500 mb-2">
            by{" "}
            <Link
              to={`/profile/${post.author?._id}`}
              className="text-blue-600"
            >
              {post.author?.username}
            </Link>
          </p>

          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}