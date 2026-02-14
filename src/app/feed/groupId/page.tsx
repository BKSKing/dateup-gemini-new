"use client"; // Filtering ke liye client component zaroori hai

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import NoticeCard from "@/components/NoticeCard";
import Sidebar from "@/components/Sidebar";

// Supabase Init
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function FeedPage({ params }: { params: { groupId: string } }) {
  const [allNotices, setAllNotices] = useState<any[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch notices on mount
  useEffect(() => {
    async function fetchNotices() {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("group_id", params.groupId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setAllNotices(data);
        setFilteredNotices(data);
      }
      setLoading(false);
    }
    fetchNotices();
  }, [params.groupId]);

  // 2. Filter Logic
  const handleFilter = (tag: string) => {
    if (tag === "All") {
      setFilteredNotices(allNotices);
    } else {
      setFilteredNotices(allNotices.filter((n) => n.category_tag === tag));
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading notices...</div>;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - handleFilter prop pass karna mat bhoolna */}
      <Sidebar groupId={params.groupId} onFilterChange={handleFilter} />

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl mx-auto border-x border-zinc-800 min-h-screen pb-20">
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold italic text-blue-500">
            DateUp Feed
          </h2>
        </header>

        <div className="flex flex-col">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <p className="p-10 text-center text-zinc-500">
              No notices found in this category.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
