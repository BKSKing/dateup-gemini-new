"use client";
import { useState } from "react";
import { uploadNoticeImage } from "@/lib/uploadImage";

export default function AdminUpload() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "General",
    groupId: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadNoticeImage(file);
      }

      // Final Notice Data API ko bhejna
      const res = await fetch("/api/notices/create", {
        method: "POST",
        body: JSON.stringify({ ...formData, imageUrl }),
      });

      if (res.ok) alert("Notice Posted Successfully!");
    } catch (err) {
      alert("Error uploading!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-950 border border-zinc-800 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Post New Notice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Notice Title"
          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        {/* Content */}
        <textarea
          placeholder="Notice Description..."
          rows={4}
          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />

        {/* Tag Selector */}
        <select
          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
        >
          <option value="General">General</option>
          <option value="Urgent">Urgent</option>
          <option value="Event">Event</option>
          <option value="Holiday">Holiday</option>
        </select>

        {/* Image Upload Box */}
        <div className="border-2 border-dashed border-zinc-700 p-4 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-zinc-400"
          />
          <p className="text-xs text-zinc-500 mt-2">Attach Image (Optional)</p>
        </div>

        <button
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
        >
          {loading ? "Posting..." : "Post Notice to DateUp"}
        </button>
      </form>
    </div>
  );
}
