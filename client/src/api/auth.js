import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};

export const verifyOtp = async (
  email,
  otp
) => {
  const response = await axios.post(
    `${API}/verify-otp`,
    {
      email,
      otp,
    }
  );

  return response.data;
};