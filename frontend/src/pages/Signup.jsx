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


const payload = {
  username: email.trim(),
  firstName: firstName.trim(),
  lastName: lastName.trim(),
  password: password.trim()
};

if (!payload.username || !payload.firstName || !payload.lastName || !payload.password) {
  alert("Please fill all fields");
  return;
}

try {

  const res = await axios.post(`${BACKEND_URL}/user/signup`, payload);

  alert(res.data.message || "Signup successful");

  // IMPORTANT: do NOT login here
  localStorage.removeItem("token");

  // go to signin page
  navigate("/signin");

} catch (err) {
  console.log(err);
  alert(err.response?.data?.message || "Signup failed");
}


}

return ( <div className="h-screen flex items-center justify-center bg-slate-200"> <div className="bg-white p-8 rounded-xl w-[380px] shadow">


    <h1 className="text-2xl font-bold text-center mb-4">PayFlow</h1>
    <p className="text-center text-gray-500 mb-6">Sign up</p>

    <input className="border w-full p-2 mb-3 rounded"
      placeholder="First name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />

    <input className="border w-full p-2 mb-3 rounded"
      placeholder="Last name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />

    <input className="border w-full p-2 mb-3 rounded"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input type="password"
      className="border w-full p-2 mb-4 rounded"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleSignup}
      className="bg-black text-white w-full p-2 rounded hover:bg-gray-800">
      Sign up
    </button>

  </div>
</div>


);
}
