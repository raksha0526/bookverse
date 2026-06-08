import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  if (user) {
    navigate("/dashboard");
  }
}, [navigate]);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        username,
        email,
        password,
      });

      alert(data.message);

      localStorage.setItem(
        "pendingEmail",
        email
      );

      navigate("/verify-otp");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600"
        >
          Login
        </Link>
      </p>
    </div>
  );
}