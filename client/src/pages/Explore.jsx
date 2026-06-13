import { useEffect, useState } from "react";
import {
getPosts,
addComment,
likePost,
} from "../api/post";
import { Link } from "react-router-dom";

export default function Explore() {
const [posts, setPosts] = useState([]);
const [commentText, setCommentText] =
  useState({});
const [search, setSearch] =
  useState("");

const fetchPosts = async () => {
try {
const data = await getPosts();
setPosts(data);
} catch (error) {
console.log(error);
}
};

useEffect(() => {
fetchPosts();
}, []);

const filteredPosts = posts.filter(
  (post) =>
    post.title
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    post.content
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    post.author?.username
      ?.toLowerCase()
      .includes(search.toLowerCase())
);


const handleComment = async (
postId
) => {
if (!commentText[postId]) return;

try {
  await addComment(
    postId,
    commentText[postId]
  );

  fetchPosts();

  setCommentText({
    ...commentText,
    [postId]: "",
  });
} catch (error) {
  console.log(error);
}


};

const handleLike = async (
postId
) => {
try {
await likePost(postId);
fetchPosts();
} catch (error) {
console.log(error);
}
};
return (
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-4xl font-bold mb-6">
      Explore Reviews
    </h1>

    <input
      type="text"
      placeholder="🔍 Search reviews, books, users..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border p-3 rounded mb-6"
    />

    {filteredPosts.length === 0 ? (
      <p className="text-gray-500">
        No reviews found.
      </p>
    ) : (
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="
            bg-white
            rounded-xl
            shadow-md
            hover:shadow-xl
            transition
            duration-300
            overflow-hidden
            p-5
            "
          >
            {post.coverImage && (
              <img
                src={`http://localhost:5000${post.coverImage}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

           <Link
  to={`/review/${post._id}`}
  className="hover:text-blue-600"
>
  <h2 className="text-2xl font-bold">
    📖 {post.title}
  </h2>
</Link>

            <p className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm mt-2 mb-2">
              {post.category}
            </p>

            <p className="text-gray-500 mb-2">
              by{" "}
              <Link
                to={`/profile/${post.author?._id}`}
                className="text-blue-600 hover:underline"
              >
                {post.author?.username}
              </Link>
            </p>

           <p>
  {post.content.slice(
    0,
    120
  )}
  ...
</p>

<Link
  to={`/review/${post._id}`}
  className="
  text-blue-600
  font-semibold
  mt-2
  inline-block
  "
>
  Read More →
</Link>

            {/* LIKE BUTTON */}
            <div className="mt-3">
              <button
                onClick={() =>
                  handleLike(post._id)
                }
                className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
              >
                ❤️ {post.likes?.length || 0}
              </button>
            </div>

            {/* COMMENTS */}
            <div className="mt-4">
              <h3 className="font-bold">
                Comments
              </h3>

              {post.comments?.length > 0 ? (
                post.comments.map(
                  (comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-2 rounded mt-2"
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
                <p className="text-gray-500 mt-2">
                  No comments yet.
                </p>
              )}
            </div>

            {/* COMMENT INPUT */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={
                  commentText[
                    post._id
                  ] || ""
                }
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [post._id]:
                      e.target.value,
                  })
                }
                className="border p-2 flex-1 rounded"
              />

              <button
                onClick={() =>
                  handleComment(
                    post._id
                  )
                }
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
              >
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)};