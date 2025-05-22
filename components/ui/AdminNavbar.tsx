"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (user?.email === "admin@admin.com") {
      setAdminEmail(user.email);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-100 via-white to-blue-200 text-blue-900 px-6 py-4 shadow-md border-b border-blue-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="space-x-6 text-sm font-medium">
          <Link href="/admin" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/users" className="hover:underline">
            Users
          </Link>
          <Link href="/admin/posts" className="hover:underline">
            Posts
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 hover:text-blue-800"
          >
            <UserCircle className="w-6 h-6" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-blue-900 rounded shadow-lg py-3 z-50">
              <div className="px-4 mb-2">
                <p className="font-semibold text-sm">Administrator</p>
                <p className="text-xs text-gray-500">{adminEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
