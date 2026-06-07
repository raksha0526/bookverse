import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/auth";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const email =
    localStorage.getItem("pendingEmail");

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await verifyOtp(
      email,
      otp
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );

    localStorage.removeItem(
      "pendingEmail"
    );

    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Verify OTP
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full mb-3"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
}