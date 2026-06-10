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

return ( <div className="max-w-5xl mx-auto p-6"> <h1 className="text-4xl font-bold mb-6">
Explore Reviews </h1>

  {posts.length === 0 ? (
    <p>No reviews found.</p>
  ) : (
    posts.map((post) => (
      <div
        key={post._id}
        className="bg-white shadow rounded p-4 mb-6"
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

          {post.comments?.length >
          0 ? (
            post.comments.map(
              (
                comment,
                index
              ) => (
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
                  :{" "}
                  {comment.text}
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
    ))
  )}
</div>


);
}
