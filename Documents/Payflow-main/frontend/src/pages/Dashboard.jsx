import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");

  /* ---------- AUTH GUARD ---------- */
  useEffect(() => {
    if (!token) navigate("/signin");
  }, []);

  /* ---------- BALANCE ---------- */
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/account/balance`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBalance(res.data.balance))
      .catch(() => {});
  }, []);

  /* ---------- CURRENT USER (GREETING) ---------- */
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setFirstName(res.data.firstName))
      .catch(() => {});
  }, []);

  /* ---------- USERS ---------- */
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/bulk?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsers(res.data.users || []))
      .catch(() => setUsers([]));
  }, [filter]);

  /* ---------- SEND MONEY ---------- */
  const sendMoney = async (to) => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/account/transfer`,
        { to, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const res = await axios.get(`${BACKEND_URL}/account/balance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(res.data.balance);
      setAmount("");
      alert("Transfer successful");
    } catch {
      alert("Transfer failed");
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-4 bg-slate-50 shadow">
        <h1 className="text-2xl font-bold text-blue-500">PayFlow</h1>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center">
            {firstName?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-6 space-y-6">

        {/* BALANCE + ACTIVITY */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between text-blue-500 font-semibold">
              <span>Current Balance</span>
              <span>{new Date().toDateString()}</span>
            </div>

            <p className="mt-2 text-gray-600">Welcome, {firstName}</p>

            <h2 className="text-4xl font-bold mt-3">${balance}</h2>
            <p className="text-sm text-gray-500 mt-1">Available</p>

            <div className="flex gap-3 mt-4">
              <button className="border rounded-full px-4 py-1 text-blue-500">
                Transfer Money
              </button>
              <button className="border rounded-full px-4 py-1 text-blue-500">
                Add Money
              </button>
              <button className="border rounded-full px-4 py-1 text-blue-500">
                Manage currencies
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-blue-500 font-semibold text-center">
              Recent Activity
            </h3>

            <div className="border rounded-lg mt-4 p-2 grid grid-cols-4 text-sm text-gray-500">
              <span>Timestamp</span>
              <span>Amount</span>
              <span>Type</span>
              <span>Recipient ID</span>
            </div>

            <div className="mt-4 bg-pink-100 text-sm p-2 rounded">
              <span className="font-semibold text-blue-500">
                Take our quick survey
              </span>
              <p>
                We want to know what you think about the new website.
                It will only take a few seconds
              </p>
            </div>
          </div>
        </div>

        {/* BANK & CARDS (STATIC UI) */}
        <div className="bg-white rounded-xl p-6 shadow w-1/2">
          <h3 className="text-blue-500 font-semibold mb-4">Bank and cards</h3>

          <div className="mb-3">
            <p className="font-semibold">US BANK, MO</p>
            <p className="text-gray-500 text-sm">
              Checking ending with ********7384
            </p>
          </div>

          <div className="mb-4">
            <p className="font-semibold">DISCOVER</p>
            <p className="text-gray-500 text-sm">
              Card ending with ********8465
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border rounded-full px-4 py-1 text-blue-500">
              Link a card or bank
            </button>
            <button className="border rounded-full px-4 py-1 text-blue-500">
              Manage cards or banks
            </button>
          </div>
        </div>

        {/* USERS LIST */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-3">Users</h3>

          <input
            className="w-full border rounded p-2 mb-3"
            placeholder="Search users..."
            onChange={e => setFilter(e.target.value)}
          />

          <input
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          {users.map(user => (
            <div
              key={user._id}
              className="flex justify-between items-center mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
                  {user.firstName[0]}
                </div>
                <span>{user.firstName} {user.lastName}</span>
              </div>

              <button
                onClick={() => sendMoney(user._id)}
                className="bg-slate-800 text-white px-4 py-2 rounded"
              >
                Send Money
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
