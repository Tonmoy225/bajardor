import type { Metadata } from "next";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "পাতাটি পাওয়া যায়নি" };

export default function NotFound() {
  return <EmptyState />;
}
