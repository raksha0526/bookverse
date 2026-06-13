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
    localStorage.getItem(
      "userInfo"
    )
  );

  const res = await axios.post(
    API,
    postData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const addComment = async (
  postId,
  text
) => {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const res = await axios.put(
    `${API}/${postId}/comment`,
    { text },
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



export const deletePost = async (
  postId
) => {
  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const res = await axios.delete(
    `${API}/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return res.data;
};


export const likePost = async (
postId
) => {
const user = JSON.parse(
localStorage.getItem("userInfo")
);

const res = await axios.post(
`${API}/${postId}/like`,
{},
{
headers: {
Authorization: `Bearer ${user.token}`,
},
}
);

return res.data;
};

export const updatePost = async (
  postId,
  postData
) => {
  const user = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  const res = await axios.put(
    `${API}/${postId}`,
    postData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const getPostById = async (
  postId
) => {
  const res = await axios.get(
    `${API}/${postId}`
  );

  return res.data;
};