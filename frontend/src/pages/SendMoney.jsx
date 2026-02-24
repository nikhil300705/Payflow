import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../config.js";

export default function SendMoney() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};
  const [amount, setAmount] = useState("");

  if (!id) return <h3>User not selected</h3>;

  async function send() {
    try {
      await axios.post(`${BACKEND_URL}/account/transfer`,
        { to:id, amount:Number(amount) },
        { headers:{ Authorization:"Bearer "+localStorage.getItem("token") }}
      );
      alert("Transfer success");
      navigate("/dashboard");
    } catch {
      alert("Transfer failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow w-[350px]">
        <h2 className="text-xl mb-4">Send to {name}</h2>

        <input
          type="number"
          placeholder="amount"
          className="border p-2 w-full mb-4"
          onChange={e=>setAmount(e.target.value)}
        />

        <button className="bg-black text-white w-full p-2" onClick={send}>
          Send Money
        </button>
      </div>
    </div>
  );
}