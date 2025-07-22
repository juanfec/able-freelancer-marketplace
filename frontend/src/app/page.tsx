"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser } from "./userApi";

type User = {
  id: number;
  email: string;
  password: string;
  name?: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError("Failed to fetch users"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await createUser({ email, password, name });
      setUsers((prev) => [...prev, user]);
      setEmail("");
      setPassword("");
      setName("");
    } catch {
      setError("Failed to create user");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="mb-6">
        {users.map((u) => (
          <li key={u.id} className="border-b py-2">{u.email} {u.name && `- ${u.name}`}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded p-2 mt-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
