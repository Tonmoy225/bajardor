import { redirect } from "next/navigation";

// The name form now lives on /profile itself.
export default function UpdateProfilePage() {
  redirect("/profile");
}
