import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 async function handleSignup() {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/user/signup`,
      {
        userName: email.trim().toLowerCase(),
        firstName,
        lastName,
        password
      }
    );

    // ⭐ LOGIN IMMEDIATELY AFTER SIGNUP
    localStorage.setItem("token", res.data.token);

    alert("Account created successfully");

    // go directly to dashboard
    navigate("/dashboard");

  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
}

  return (
    <div className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl w-[380px] shadow">

        <h1 className="text-2xl font-bold text-center mb-4">PayFlow</h1>
        <p className="text-center text-gray-500 mb-6">Sign up</p>

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
        >
          Sign up
        </button>

      </div>
    </div>
  );
}
