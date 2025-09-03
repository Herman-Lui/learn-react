import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  dob: string;
  avatarURL: string;
};

// Fetch once on mount from Spring Boot via Vite proxy (/api -> http://localhost:8080)
export default function Labs() {
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User[] = await res.json();
        if (!cancelled) {
          setAllUsers(data);
          setUsersFiltered(data);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) {
      setUsersFiltered(allUsers);
      return;
    }
    const found = allUsers.filter((u) =>
      u.id.toString().toLowerCase().includes(q) ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q)
    );
    setUsersFiltered(found);
  }, [allUsers, searchText]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">search</h2>
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-2 border-b">
        <input
          type="text"
          className="border px-2 py-1 w-full bg-white text-black"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {loading && <p className="p-2">Loading…</p>}
      {error && (
        <p className="p-2 text-red-600">Failed to load users: {error}</p>
      )}

      <div>
        {usersFiltered.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <img
              src={user.avatarURL}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>DOB: {user.dob}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Country: {user.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
