import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(form);

      console.log("\n--- RECEIVED TOKENS IN FRONTEND ---");
      console.log("Frontend Refresh Token:", response.data.refresh);
      console.log("Frontend Access Token:", response.data.access);
      console.log("----------------------------------\n");

      localStorage.setItem("token", response.data.access); // Store the correct token
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
