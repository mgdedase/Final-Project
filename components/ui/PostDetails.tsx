"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function PostDetails({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function fetchData() {
      const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const resComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

      const postData = await resPost.json();
      const commentData = await resComments.json();

      setPost(postData);
      setComments(commentData);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleAddComment = () => {
    const newComment: Comment = {
      id: Date.now(), // temporary unique ID
      name,
      email,
      body,
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setBody("");
    setIsModalOpen(false);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <main className="pt-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{post.title}</h1>
      <p className="mb-4">{post.body}</p>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-blue-600">Comments</h2>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
          Add Comment
        </Button>
      </div>

      <div className="max-h-110 overflow-y-auto pr-2 bg-white border rounded shadow-sm">
        <ul className="space-y-4 p-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded bg-gray-50 relative">
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="absolute top-2 right-2 text-red-500 text-xs"
              >
                Delete
              </button>
              <p className="font-bold text-blue-700">{comment.name}</p>
              <p className="text-sm text-gray-500 mb-1">{comment.email}</p>
              <p className="text-gray-700">{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Comment Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-bold text-blue-600 mb-4">Comment</Dialog.Title>
            <div className="space-y-4">
              <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Textarea placeholder="Your Comment" value={body} onChange={(e) => setBody(e.target.value)} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
