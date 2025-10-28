"use client";

import React from "react";
import Image from "next/image";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MoreVerticalIcon, Trash2 } from "lucide-react";

// ----- Types -----
export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string | Date; // ISO or Date
  time?: string; // optional display time like "09:30 AM"
};

// ----- Utils -----
function formatDate(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

// ----- Card Component -----
function Blog({
  blog,
}: {
  blog: Blog;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const created = useMemo(() => formatDate(blog.createdAt), [blog.createdAt]);

  return (
    <Card className="group relative border-none p-3">
      {/* Image */}
      <div className="relative aspect-16/11 w-full overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <Button
          size="lg"
          className="absolute right-6 top-3 hidden group-hover:flex rounded-xl font-bold text-white"
        >
          <MoreVerticalIcon className="text-7xl" />
        </Button>
        <div className="hidden group-hover:flex absolute right-3 top-14 ">
          <div className="rounded-xl bg-white/90 p-3 backdrop-blur-md shadow">
            <Button size="icon" className="h-9 w-9 block cursor-pointer">
              <span className="flex items-center gap-2">
                <Edit className="h-14 w-14" /> Edit
              </span>
            </Button>
            <hr className="border border-gray-200" />
            <Button size="icon" className="h-9 w-20 block cursor-pointer">
              <span className="flex items-center gap-2">
                <Trash2 className="h-14 w-20" /> Delete
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <CardContent className="space-y-3 px-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{created}</span>
          <span>
            {blog.time ??
              new Date(blog.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
        </div>

        <h3 className="text-[16px] font-medium">{blog.title}</h3>

        <p className="line-clamp-2 text-sm text-[#62676C]">{blog.excerpt}</p>
      </CardContent>
    </Card>
  );
}

// ----- Grid Component -----
export default function BlogCard() {
  const data: Blog[] = new Array(6).fill(0).map((_, i) => ({
    id: `post-${i + 1}`,
    title: "5 Quick Tips to Keep Your Car Shining",
    excerpt:
      "Maintaining that showroom shine is easier than you think. From washing in the shade to using microfiber…",
    imageUrl:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2069&auto=format&fit=crop",
    createdAt: "2025-04-12T09:30:00.000Z",
    time: "09:30 AM",
  }));

  const onEdit = (id: string) => console.log("edit", id);
  const onDelete = (id: string) => console.log("delete", id);

  return (
    <div className="mx-auto max-w-7xl py-4">
      <div className="pb-4 lg:pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Blog List</h2>
        </div>
        <Button
          className="bg-secondary cursor-pointer rounded-xl text-white"
          size="lg"
        >
          Create Blog
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((b) => (
          <Blog key={b.id} blog={b} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
