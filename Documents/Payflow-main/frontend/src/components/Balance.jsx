export function Balance({ balance }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between">
      <div>
        <p className="text-blue-600 font-semibold">Current Balance</p>
        <p className="text-4xl font-bold mt-2">₹ {balance}</p>
        <p className="text-slate-500 mt-1">Available</p>

        <div className="flex gap-3 mt-4">
          <button className="pill-btn">Transfer Money</button>
          <button className="pill-btn">Add Money</button>
          <button className="pill-btn">Manage currencies</button>
        </div>
      </div>

      <div className="w-1/3 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
        No recent transactions
      </div>
    </div>
  );
}
