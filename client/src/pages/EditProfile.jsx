import { useState } from "react";
import { updateProfile } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const navigate = useNavigate();

  const [username, setUsername] = useState(
    user.username
  );

  const [bio, setBio] = useState("");

  const [interests, setInterests] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile(user._id, {
      username,
      bio,
      interests: interests
        .split(",")
        .map((item) => item.trim()),
    });

    alert("Profile Updated");

    navigate(-1);
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          placeholder="Username"
        />

        <textarea
          className="border p-2 w-full mb-3"
          rows="4"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          placeholder="Bio"
        />

        <input
          className="border p-2 w-full mb-3"
          value={interests}
          onChange={(e) =>
            setInterests(e.target.value)
          }
          placeholder="Fantasy, Sci-Fi, Self Help"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}