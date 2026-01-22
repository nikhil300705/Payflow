import { useState } from "react";
import axios from "axios";

export default function Users({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMoney() {
    setLoading(true);
    await axios.post(
      "http://51.21.193.154:5000/api/v1/account/transfer",
      { to: "dummyUserId", amount: Number(amount) },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    onSuccess({
      amount,
      time: new Date().toLocaleString(),
    });

    setAmount("");
    setPin("");
    setLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Users</h2>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          M
        </div>
        <p className="flex-1">Mohammed Mohammed</p>
        <button className="bg-black text-white px-4 py-2 rounded">
          Send Money
        </button>
      </div>

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        placeholder="Bank PIN"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        disabled={loading}
        onClick={sendMoney}
        className="w-full bg-black text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Send"}
      </button>
    </div>
  );
}
