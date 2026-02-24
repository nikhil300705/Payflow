import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../config.js";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      if (!username || !password) {
        alert("Username and password required");
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        username: username.trim(),
        password: password.trim()
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl w-[380px] shadow">

        <h1 className="text-3xl font-bold text-center text-blue-500">PayFlow</h1>
        <h2 className="text-xl text-center mt-2">Sign in</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={signin}
          className="w-full bg-slate-800 text-white p-2 rounded"
        >
          Sign in
        </button>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline">Sign up</Link>
        </p>

      </div>
    </div>
  );
}