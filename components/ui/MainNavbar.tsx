// components/ui/MainNavbar.tsx
"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

export default function MainNavbar() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) return;

    if (user.email === "admin@admin.com" && user.username === "admin123") {
      setRole("admin");
    } else {
      setRole("user");
    }
  }, []);

  if (role === "admin") return <AdminNavbar />;
  if (role === "user") return <UserNavbar />;
  return null; // nothing if no user logged in
}
