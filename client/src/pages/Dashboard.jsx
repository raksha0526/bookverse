import { useEffect, useState } from "react";
import { getMyPosts, createPost } from "../api/post";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

 const fetchPosts = async () => {
  const data = await getMyPosts();

  const myPosts = data.filter(
    (post) => post.author?._id === user._id
  );

  setPosts(data);
};

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost({
        title,
        content,
        author: user._id,
      });

      setTitle("");
      setContent("");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

const handleLogout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("pendingEmail");

  navigate("/login");
};
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          📚 BookVerse
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Create Post */}
      <div className="bg-white shadow p-4 rounded mb-8">
        <h2 className="text-xl font-bold mb-3">
          Create Review
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Title"
            className="border p-2 w-full mb-3 rounded"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Write your review..."
            className="border p-2 w-full mb-3 rounded"
            rows="4"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Review
          </button>
        </form>
      </div>

      {/* Posts Feed */}
      <div>
        {posts.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        ) : (
          posts.map((post) => (
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
                  className="text-blue-600 hover:underline"
                >
                  {post.author?.username}
                </Link>
              </p>

              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}