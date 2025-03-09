import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await API.post("register/", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};
export const loginUser = (userData) => API.post("login/", userData);
export const updateUser = async (userData, token) => {
  try {
    const response = await API.put(
      "/update/",
      userData, // Pass only userData (do NOT reassign inside the function)
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is correct
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update Error:", error.response?.data || error.message);
    throw error;
  }
};
export const deleteUser = (token) =>
  API.delete("delete/", { headers: { Authorization: `Bearer ${token}` } });
