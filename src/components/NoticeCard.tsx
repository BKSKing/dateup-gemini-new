"use client";
import { useEffect } from "react";

export default function NoticeCard({ notice }: { notice: any }) {
  // Logic: Jab card screen par aaye, view count badhao
  useEffect(() => {
    const incrementView = async () => {
      await fetch("/api/increment-view", {
        method: "POST",
        body: JSON.stringify({ id: notice.id }),
      });
    };
    incrementView();
  }, [notice.id]);

  return (
    <div className="border-b border-zinc-800 p-0 mb-4 bg-zinc-950">
      {/* Top Bar: Org Name & Tag */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
          <span className="font-semibold text-sm">
            Notice from Organization
          </span>
        </div>
        <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-[10px] rounded-full uppercase font-bold">
          {notice.category_tag}
        </span>
      </div>

      {/* Main Image (If exists) */}
      {notice.image_url && (
        <div className="w-full bg-zinc-900 aspect-square overflow-hidden">
          <img
            src={notice.image_url}
            alt="notice"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Content Area */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{notice.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-3">
          {notice.content}
        </p>

        {/* Footer: View Count & Date */}
        <div className="flex items-center justify-between text-zinc-500 text-xs mt-4">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{notice.view_count} views</span>
          </div>
          <span>{new Date(notice.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
