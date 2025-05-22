"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Menu, X, UserCircle } from "lucide-react";

export default function UserNavbar() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (user) {
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-200 via-white to-blue-100 text-blue-900 border-b border-blue-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold"></div>

        {/* Hamburger toggle (mobile) */}
        <button className="md:hidden" onClick={() => setIsMenuOpen((prev) => !prev)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/posts" className="hover:underline hover:text-blue-800">
            My Posts
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 hover:text-blue-800"
            >
              <UserCircle className="w-6 h-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                <div className="px-4 pb-2">
                  <p className="text-sm font-semibold">{userName || "User"}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
                <Link
                  href={`/users/${userId}`}
                  className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/posts/create"
                  className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Post
                </Link>
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
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <Link
            href="/posts"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:underline hover:text-blue-800"
          >
            My Posts
          </Link>
          <Link
            href={`/users/${userId}`}
            onClick={() => setIsMenuOpen(false)}
            className="block hover:underline hover:text-blue-800"
          >
            My Profile
          </Link>
          <Link
            href="/posts/create"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:underline hover:text-blue-800"
          >
            Create Post
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
