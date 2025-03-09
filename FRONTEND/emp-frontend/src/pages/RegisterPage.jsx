import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required!");
      return;
    }

    try {
      await registerUser(form);
      alert("Registration Successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      setError(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
