export default function Appbar() {
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">PayFlow</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
