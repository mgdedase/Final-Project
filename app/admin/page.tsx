"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import AdminNavbar from "@/components/ui/AdminNavbar";
import { ApexOptions } from "apexcharts";
import MainNavbar from "@/components/ui/MainNavbar";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(storedUser);
    const isAdmin = user.email === "admin@admin.com" && user.username === "admin123";

    if (!isAdmin) {
      alert("Access denied. You are not an admin.");
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      setUsers(await usersRes.json());
      setPosts(await postsRes.json());
      setComments(await commentsRes.json());
    };

    fetchData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: { type: "bar" },
    xaxis: { categories: ["Users", "Posts", "Comments"] },
    colors: ["#3b82f6"],
  };

  const chartSeries = [
    {
      name: "Total Count",
      data: [users.length, posts.length, comments.length],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainNavbar />
      </div>

      {/* Scrollable main content with padding to avoid navbar overlap */}
      <main className="pt-20 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Posts</h2>
              <p className="text-3xl font-bold text-blue-600">{posts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Comments</h2>
              <p className="text-3xl font-bold text-blue-600">{comments.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Activity Overview</h2>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
