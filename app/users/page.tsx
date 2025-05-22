"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainNavbar from "@/components/ui/MainNavbar";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MainNavbar/>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <Link href={`/users/${user.id}`} key={user.id}>
                <li className="border rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </li>
              </Link>
            ))}
          </ul>
       )}
      </main>
    </>
  );
}
