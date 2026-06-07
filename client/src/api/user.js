import axios from "axios";

export const getUserProfile = async (id) => {
  const res = await axios.get(
    `http://localhost:5000/api/users/${id}`
  );

  return res.data;
};

export const updateProfile = async (
  id,
  userData
) => {
  const res = await axios.put(
    `http://localhost:5000/api/users/${id}`,
    userData
  );

  return res.data;
};