import { useState, useEffect } from "react";

function DataGrid() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data once when component first loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []); // empty array = run only once, on mount

  // Filter by search text (matches name or email)
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort the filtered results
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey].toLowerCase();
    const valB = b[sortKey].toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  function toggleSort(key) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">User Directory</h2>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={() => toggleSort("name")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          Sort by Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => toggleSort("email")}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          Sort by Email {sortKey === "email" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sorted.map((user) => (
          <div key={user.id} className="bg-gray-800 p-5 rounded-lg">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <p className="text-gray-400 text-sm mt-2">{user.company.name}</p>
            <p className="text-gray-500 text-sm">{user.address.city}</p>
          </div>
        ))}

        {sorted.length === 0 && (
          <p className="text-gray-400 col-span-full text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default DataGrid;