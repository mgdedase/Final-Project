"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserNavbar from "@/components/ui/UserNavbar";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (!user) {
      alert("Please log in first.");
      router.push("/login");
    } else {
      setUserId(user.id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      userId,
    };

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    alert("Post created successfully!");
    router.push("/posts");
  };

  return (
    <>
      <UserNavbar />
      <main className="p-6 mt-20">
        <Card className="max-w-2xl mx-auto shadow-lg border border-blue-200">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-blue-700 text-center">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Write your post content here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
