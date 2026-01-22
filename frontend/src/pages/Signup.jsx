import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await axios.post(`${BACKEND_URL}/user/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      // signup success → go to signin
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-8 rounded-xl w-[380px] shadow">
        <h1 className="text-3xl font-bold text-center text-blue-500">PayFlow</h1>
        <h2 className="text-xl text-center mt-2">Sign up</h2>
        <p className="text-center text-gray-500 mb-4">
          Enter your information to create an account
        </p>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-slate-800 text-white p-2 rounded"
        >
          Sign up
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
