import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  async function loadBalance() {
    const res = await axios.get(`${BACKEND_URL}/account/balance`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    setBalance(res.data.balance);
    setName(res.data.firstName);
    setTransactions(res.data.transactions);
  }

  async function loadUsers(text = "") {
    const res = await axios.get(`${BACKEND_URL}/user/bulk?filter=${text}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });

    setUsers(res.data.users);
  }

  useEffect(() => {
    loadBalance();
    loadUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => loadUsers(filter), 300);
    return () => clearTimeout(delay);
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#eef2f7] p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600">PayFlow</h1>

        <div className="flex items-center gap-4">
          {/* USER ICON */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
            {name?.charAt(0)}
          </div>

          {/* SMALL LOGOUT */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-10">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* BALANCE CARD */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between">
              <div className="text-blue-600 font-semibold">
                Current Balance
              </div>
              <div className="text-gray-500 text-sm">
                {new Date().toDateString()}
              </div>
            </div>

            <div className="text-gray-600 mt-2">
              Welcome, {name}
            </div>

            <div className="text-5xl font-bold mt-4">
              ${balance}
            </div>

            <div className="text-gray-500 mt-1">
              Available
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm">
                Transfer Money
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm">
                Add Money
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm">
                Manage currencies
              </button>
            </div>
          </div>

          {/* BANK & CARDS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-blue-600 font-semibold mb-4">
              Bank and cards
            </div>

            <div className="mb-4">
              <div className="font-semibold">US BANK, MO</div>
              <div className="text-gray-500 text-sm">
                Checking ending with ******7384
              </div>
            </div>

            <div className="mb-6">
              <div className="font-semibold">DISCOVER</div>
              <div className="text-gray-500 text-sm">
                Card ending with ******8465
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-[#0f172a] text-white px-4 py-2 rounded-full text-sm">
                Link a card or bank
              </button>
              <button className="bg-[#0f172a] text-white px-4 py-2 rounded-full text-sm">
                Manage cards or banks
              </button>
            </div>
          </div>

          {/* USERS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-4">Users</h2>

            <input
              type="text"
              placeholder="Search users..."
              className="border w-full p-2 rounded mb-6"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              {users.map(user => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                      {user.firstName.charAt(0)}
                    </div>
                    <div className="text-sm">
                      {user.firstName}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/send", {
                        state: { id: user._id, name: user.firstName }
                      })
                    }
                    className="bg-[#1e293b] hover:bg-[#0f172a] text-white w-24 h-9 rounded-full text-sm flex items-center justify-center transition"
                  >
                    Send
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN — RECENT ACTIVITY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-blue-600 font-semibold mb-4">
            Recent Activity
          </div>

          <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-2 text-sm">
            <div>Timestamp</div>
            <div>Amount</div>
            <div>Type</div>
            <div>Recipient ID</div>
          </div>

          {transactions.length === 0 ? (
            <div className="text-gray-400">No recent transactions</div>
          ) : (
            transactions.slice().reverse().map((t) => (
              <div
                key={t._id}
                className="grid grid-cols-4 border-b py-2 text-sm"
              >
                <div>{new Date(t.date).toLocaleString()}</div>

                <div className={
                  t.type === "debit"
                    ? "text-red-500"
                    : "text-green-600"
                }>
                  {t.type === "debit" ? "-" : "+"}${t.amount}
                </div>

                <div>{t.type}</div>

                <div>{t._id.slice(-6)}</div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}