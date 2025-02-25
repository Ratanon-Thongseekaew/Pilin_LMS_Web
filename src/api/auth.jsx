import axios from "axios";

export const actionRegister = async (value) => {
  return await axios.post("http://localhost:8989/register", value);
};

export const actionLogin = async (value) => {
  return await axios.post("http://localhost:8989/login", value);
};

export const actionCurrentUser = async (token) => {
  return await axios.get("http://localhost:8989/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
