import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/user";

export default function Profile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
  localStorage.getItem("userInfo")
);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getUserProfile(id);
      setData(res);
    };

    fetchProfile();
  }, [id]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* User Info */}
      <h1 className="text-4xl font-bold">
        {data.user.username}
      </h1>

      <p className="mt-2">
        {data.user.bio || "No bio added yet."}
      </p>

      <div className="mt-4">
        <h2 className="font-bold">
          Interests
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {data.user.interests?.length > 0 ? (
            data.user.interests.map(
              (interest, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              )
            )
          ) : (
            <p>No interests added yet.</p>
          )}
        </div>
{loggedInUser?._id === data.user._id && (
  <Link
    to="/edit-profile"
    className="bg-blue-600 text-white px-4 py-2 rounded inline-block mt-4"
  >
    Edit Profile
  </Link>
)}
      </div>

      {/* Posts */}
      <h2 className="text-2xl font-bold mt-8">
        Recent Reviews
      </h2>

      {data.posts.length === 0 ? (
        <p className="mt-4">
          No reviews posted yet.
        </p>
      ) : (
        data.posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow p-4 rounded mt-4"
          >
            <h3 className="font-bold text-lg">
              {post.title}
            </h3>

            <p className="mt-2">
              {post.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}