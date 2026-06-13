// src/pages/ReviewDetails.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../api/post";

export default function ReviewDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data =
          await getPostById(id);

        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold">
          Loading review...
        </h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-red-500">
          Review not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/explore"
        className="text-blue-600 hover:underline"
      >
        ← Back to Explore
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-6 mt-4">
        {post.coverImage && (
          <img
            src={`http://localhost:5000${post.coverImage}`}
            alt={post.title}
            className="
            w-full
            h-96
            object-cover
            rounded-xl
            mb-6
            "
          />
        )}

        <h1 className="text-4xl font-bold mb-3">
          📖 {post.title}
        </h1>

        <span
          className="
          inline-block
          bg-indigo-100
          text-indigo-700
          px-3
          py-1
          rounded-full
          text-sm
          mb-4
          "
        >
          {post.category}
        </span>

        <p className="text-gray-500 mb-4">
          by{" "}
          <Link
            to={`/profile/${post.author?._id}`}
            className="text-blue-600 hover:underline"
          >
            {post.author?.username}
          </Link>
        </p>

        <p className="text-lg leading-8 mb-6">
          {post.content}
        </p>

        <div className="flex gap-6 mb-6 text-lg">
          <span>
            ❤️ {post.likes?.length || 0}
          </span>

          <span>
            💬 {post.comments?.length || 0}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">
            Comments
          </h2>

          {post.comments?.length > 0 ? (
            post.comments.map(
              (comment, index) => (
                <div
                  key={index}
                  className="
                  bg-gray-100
                  p-3
                  rounded
                  mb-2
                  "
                >
                  <strong>
                    {
                      comment.user
                        ?.username
                    }
                  </strong>
                  : {comment.text}
                </div>
              )
            )
          ) : (
            <p className="text-gray-500">
              No comments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}