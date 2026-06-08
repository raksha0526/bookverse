import axios from "axios";

const API = "http://localhost:5000/api/posts";

export const getMyPosts = async () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const res = await axios.get(
    "http://localhost:5000/api/users/my-posts",
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  return res.data;
};

export const createPost = async (
  postData
) => {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const res = await axios.post(
    API,
    postData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return res.data;
};

export const getPosts = async () => {
  const res = await axios.get(API);
  return res.data;
};