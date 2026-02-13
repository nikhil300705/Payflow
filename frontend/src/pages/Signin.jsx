import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      if (!email || !password) {
        alert("Email and password required");
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
  userName: email.trim().toLowerCase(),
  password: password.trim(),
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
        <p className="text-center text-gray-500 mb-4">
          Enter your credentials to access your account
        </p>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
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
