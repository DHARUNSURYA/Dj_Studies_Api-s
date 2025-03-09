import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [form, setForm] = useState({ username: "", email: "" });
  const [message, setMessage] = useState(""); // ✅ To display messages
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Redirect to login if token is missing

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      console.log("Using Access Token:", token); // ✅ Debugging
    }
  }, [token, navigate]);

  // ✅ Handle Profile Update
  const handleUpdate = async () => {
    if (!form.username && !form.email) {
      setMessage("Please enter at least one field to update.");
      return;
    }

    try {
      const response = await updateUser(form, token);
      setMessage("Profile updated successfully!");
      console.log("Updated User:", response);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Update failed!");
    }
  };

  // ✅ Handle Account Deletion
  const handleDelete = async () => {
    try {
      await deleteUser(token);
      localStorage.removeItem("token");
      alert("Account deleted!");
      navigate("/register");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Delete failed!");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true }); // ✅ Prevents back navigation
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}{" "}
      {/* ✅ Show messages */}
      <input
        placeholder="New Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="New Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Profile</button>
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white" }}
      >
        Delete Account
      </button>
      <button
        onClick={handleLogout}
        style={{ background: "gray", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
