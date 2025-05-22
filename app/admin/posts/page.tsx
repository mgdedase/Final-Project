"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AdminNavbar from "@/components/ui/AdminNavbar";
import MainNavbar from "@/components/ui/MainNavbar";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.email !== "admin@admin.com" || user.username !== "admin123") {
      alert("Access denied.");
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      const [postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      setPosts(await postsRes.json());
      setComments(await commentsRes.json());
      setLoading(false);
    };

    fetchData();
  }, []);

  const getCommentsForPost = (postId: number) =>
    comments.filter((comment) => comment.postId === postId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainNavbar />
      </div>

      {/* Main Content with Top Padding */}
      <main className="pt-20 p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">All Posts</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-2">
                  <button
                    onClick={() =>
                      setExpandedPostId((prev) => (prev === post.id ? null : post.id))
                    }
                    className="text-left w-full"
                  >
                    <h2 className="text-lg font-semibold text-blue-700">{post.title}</h2>
                    <p className="text-gray-700">{post.body}</p>
                  </button>

                  {expandedPostId === post.id && (
                    <div className="mt-4 bg-gray-50 border-t pt-3">
                      <h3 className="font-semibold text-sm text-gray-600 mb-2">
                        Comments:
                      </h3>
                      <div className="max-h-60 overflow-y-auto pr-2">
                        <ul className="space-y-2">
                          {getCommentsForPost(post.id).map((comment) => (
                            <li
                              key={comment.id}
                              className="border rounded p-2 text-sm bg-white"
                            >
                              <p className="font-bold text-blue-600">{comment.name}</p>
                              <p className="text-gray-500">{comment.email}</p>
                              <p>{comment.body}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
