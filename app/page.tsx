"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // used as password
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

      if (email === "admin@admin.com" && username === "admin123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            username,        // ✅ important!
            isAdmin: true    // ✅ cleaner check later
          })
        );
        router.push("/admin");
        return;
      }


    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const matched = users.find(
      (u: any) => u.email === email && u.username === username
    );

    if (matched) {
      localStorage.setItem("user", JSON.stringify(matched));
      router.push("/posts");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Card className="w-full max-w-md shadow-xl border border-blue-200">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-blue-800">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
             <a href="/register" className="text-blue-700 hover:underline font-medium">
              Sign up
             </a>
          </p>

        </CardContent>
      </Card>
    </main>
  );
}
