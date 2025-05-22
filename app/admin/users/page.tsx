"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import AdminNavbar from "@/components/ui/AdminNavbar";
import MainNavbar from "@/components/ui/MainNavbar";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.email !== "admin@admin.com" || user.username !== "admin123") {
      alert("Access denied.");
      window.location.href = "/";
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainNavbar />
      </div>

      {/* Scrollable content with top padding */}
      <main className="pt-20 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">All Users</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {user.name}
                  </Link>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
