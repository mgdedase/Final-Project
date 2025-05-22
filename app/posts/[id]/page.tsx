"use client";

import { use } from "react";
import PostDetails from "@/components/ui/PostDetails";
import UserNavbar from "@/components/ui/UserNavbar"; // ✅ Add this

export default function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  
  return (
    <>
      <UserNavbar /> {/* ✅ Add this */}
      <PostDetails id={id} />
    </>
  );
}
