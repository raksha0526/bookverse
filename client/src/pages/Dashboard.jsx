import { useEffect, useState } from "react";
import {
getMyPosts,
createPost,
deletePost,
updatePost,
} from "../api/post";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
const user = JSON.parse(
localStorage.getItem("userInfo")
);

const navigate = useNavigate();

const [posts, setPosts] = useState([]);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const [category, setCategory] =
  useState("Fantasy");


const [coverImage,
  setCoverImage] =
  useState(null);

const [editingId, setEditingId] =
useState(null);

const [editTitle, setEditTitle] =
useState("");

const [editContent, setEditContent] =
useState("");

const [
  editImage,
  setEditImage,
] = useState(null);

const fetchPosts = async () => {
try {
const data = await getMyPosts();
setPosts(data);
} catch (error) {
console.log(error);
}
};

useEffect(() => {
fetchPosts();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();




try {
const formData =
  new FormData();

formData.append(
  "title",
  title
);

formData.append(
  "content",
  content
);

formData.append(
  "category",
  category
);

if (coverImage) {
  formData.append(
    "coverImage",
    coverImage
  );
}

await createPost(formData);

  setTitle("");
  setContent("");

  fetchPosts();
} catch (error) {
  console.log(error);
}


};

const handleUpdate = async () => {
try {
const formData =
  new FormData();

formData.append(
  "title",
  editTitle
);

formData.append(
  "content",
  editContent
);

if (editImage) {
  formData.append(
    "coverImage",
    editImage
  );
}

await updatePost(
  editingId,
  formData
);


  setEditingId(null);
  setEditTitle("");
  setEditContent("");

  fetchPosts();
} catch (error) {
  console.log(error);
}

};

const handleDelete = async (
postId
) => {
const confirmDelete =
window.confirm(
"Delete this review?"
);

if (!confirmDelete) return;

try {
  await deletePost(postId);
  fetchPosts();
} catch (error) {
  console.log(error);
}


};

const handleLogout = () => {
localStorage.removeItem(
"userInfo"
);
localStorage.removeItem(
"pendingEmail"
);


navigate("/");


};

const totalReviews = posts.length;

const totalLikes = posts.reduce(
  (sum, post) =>
    sum + (post.likes?.length || 0),
  0
);

const totalComments = posts.reduce(
  (sum, post) =>
    sum + (post.comments?.length || 0),
  0
);



return (<div className="max-w-6xl mx-auto p-4 md:p-6"> <div className="flex justify-between items-center mb-6"> <h1 className="text-4xl font-bold">
📚 My Dashboard </h1>


    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>

  {/* CREATE REVIEW */}
  <div className="
bg-white
shadow-lg
rounded-xl
p-6
mb-8
">
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
          setTitle(
            e.target.value
          )
        }
        required
      />

<select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="border p-2 w-full mb-3 rounded"
>
  <option>Fantasy</option>
  <option>Romance</option>
  <option>Sci-Fi</option>
  <option>Mystery</option>
  <option>Self Help</option>
  <option>Biography</option>
</select>

<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setCoverImage(
      e.target.files[0]
    )
  }
  className="mb-3"
/>


      <textarea
        placeholder="Write your review..."
        className="border p-2 w-full mb-3 rounded"
        rows="4"
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
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




<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      Reviews
    </h3>
    <p className="text-3xl font-bold">
      {totalReviews}
    </p>
  </div>

  <div className="bg-pink-500 text-white p-5 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      Likes
    </h3>
    <p className="text-3xl font-bold">
      {totalLikes}
    </p>
  </div>

  <div className="bg-green-500 text-white p-5 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      Comments
    </h3>
    <p className="text-3xl font-bold">
      {totalComments}
    </p>
  </div>
</div>
<h2 className="text-2xl font-bold mb-4">
  My Reviews
</h2>

{posts.length === 0 ? (
  <p className="text-gray-500">
    No reviews yet.
  </p>
) : (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {posts.map((post) => (
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
        "
      >
        {post.coverImage && (
          <img
            src={`http://localhost:5000${post.coverImage}`}
            alt={post.title}
            className="
            w-full
            h-60
            object-cover
            "
          />
        )}

        <div className="p-5">
          <h2 className="text-2xl font-bold mb-2">
            📖 {post.title}
          </h2>

          <span
            className="
            inline-block
            bg-indigo-100
            text-indigo-700
            px-3
            py-1
            rounded-full
            text-sm
            mb-3
            "
          >
            {post.category}
          </span>

          <p className="text-gray-500 mb-3">
            by{" "}
            <Link
              to={`/profile/${post.author?._id}`}
              className="text-blue-600 hover:underline"
            >
              {post.author?.username}
            </Link>
          </p>

          <p>
  {post.content.length > 120
    ? `${post.content.slice(0, 120)}...`
    : post.content}
</p>

<Link
  to={`/review/${post._id}`}
  className="
  text-blue-600
  font-semibold
  hover:underline
  mt-2
  inline-block
  "
>
  Read More →
</Link>

          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span>
              ❤️ {post.likes?.length || 0}
            </span>

            <span>
              💬 {post.comments?.length || 0}
            </span>
          </div>

          {editingId === post._id && (
            <div className="mt-4 border-t pt-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <textarea
                value={editContent}
                onChange={(e) =>
                  setEditContent(e.target.value)
                }
                rows="4"
                className="border p-2 w-full mb-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditImage(
                    e.target.files[0]
                  )
                }
                className="mb-3"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="
                  bg-green-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-green-700
                  "
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditingId(null)
                  }
                  className="
                  bg-gray-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-gray-600
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setEditingId(post._id);
                setEditTitle(post.title);
                setEditContent(post.content);
              }}
              className="
              bg-yellow-500
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-yellow-600
              "
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(post._id)
              }
              className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-red-700
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
</div>
);}