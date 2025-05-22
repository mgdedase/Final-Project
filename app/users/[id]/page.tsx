// app/users/[id]/page.tsx

import { notFound } from "next/navigation";
import UserMap from "@/components/ui/UserMap";
import { getUser } from "@/lib/utils";
import MainNavbar from "@/components/ui/MainNavbar";

type Props = {
  params: Promise<{ id: string }>; // ✅ Promise type
};

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params; // ✅ Await the Promise
  const user = await getUser(id);
  if (!user) return notFound();

  const { name, username, email, address } = user;
  const lat = parseFloat(address?.geo?.lat || "0");
  const lng = parseFloat(address?.geo?.lng || "0");

  return (
    <>
      <MainNavbar />
      <main className="pt-20 px-4">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address.street}, {address.city}</p>
        <UserMap lat={lat} lng={lng} />
      </main>
    </>
  );
}
