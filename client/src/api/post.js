import axios from "axios";

const API = "http://localhost:5000/api/posts";

export const getPosts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await axios.post(API, postData);
  return res.data;
};