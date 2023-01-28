import axios from "axios";

const auth = async (url, user) => {
  const res = {};

  try {
    const data = await axios.post(url, user);
    console.log(data);
    res.data = data;
    res.isError = false;
  } catch (error) {
    res.isError = true;
    res.error = error.response;
  }

  return res;
};
export default auth;
