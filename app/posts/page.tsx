"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import UserNavbar from "@/components/ui/AdminNavbar";
import MainNavbar from "@/components/ui/MainNavbar";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        if (user) {
          // ✅ Only show posts by the logged-in user
          const userPosts = data.filter((post: any) => post.userId === user.id);
          setPosts(userPosts);
        }
        setLoading(false);
      });
  }, []);


  return (
    <>
      <MainNavbar/>
      <main className="pt-20 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Posts</h1>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 italic">You haven’t posted anything yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-600 mt-1">{post.body}</p>
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </>  
  );
}
