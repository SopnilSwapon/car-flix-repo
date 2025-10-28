"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2, Plus } from "lucide-react";

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
  onEdit,
  onDelete,
}: {
  blog: Blog;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const created = useMemo(() => formatDate(blog.createdAt), [blog.createdAt]);

  return (
    <Card className="group relative overflow-hidden border-muted-foreground/10 hover:shadow-sm transition-shadow">
      {/* Image */}
      <div className="relative aspect-16/11 w-full overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Action menu (kebab) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-3 top-3 h-9 w-9 rounded-xl bg-white/90 backdrop-blur-md shadow hover:bg-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem onClick={() => onEdit?.(blog.id)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete?.(blog.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Body */}
      <CardContent className="space-y-2 p-4">
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

        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight">
          {blog.title}
        </h3>

        <p className="line-clamp-2 text-xs text-muted-foreground/90">
          {blog.excerpt}
        </p>
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
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Blog List</h2>
          <p className="text-sm text-muted-foreground">
            Manage and edit your posts.
          </p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
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
