"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarClock,
  PenSquare,
} from "lucide-react";
import logo from "@/public/Logo.png"

type NavItem = {
  label: string;
  href: string;
  icon: (props: ComponentProps<"svg">) => ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",        href: "/dashboard",        icon: (p) => <LayoutDashboard {...p} /> },
  { label: "Manage Booking",   href: "/bookings",         icon: (p) => <ClipboardList {...p} /> },
  { label: "Schedule Calendar",href: "/schedule",         icon: (p) => <CalendarClock {...p} /> },
  { label: "Blog",             href: "/blog",             icon: (p) => <PenSquare {...p} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[280px] min-h-screen bg-foreground border-r border-[#E9E9E9]
                 sticky top-0 flex flex-col"
    >
      {/* Header / Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        {/* Replace /logo.svg with your logo path */}
        <Image
          src={logo}
          alt="Logo"
          width={156}
          height={156}
          className="rounded-xl"
          priority
        />
      </div>

      {/* Nav */}
      <nav className="p-4 pt-0 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                active
                  ? "bg-[#1141CB1A] text-[#1141CB]"
                  : "text-black/80 hover:text-[#1141CB] hover:bg-[#1141CB1A]",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className="shrink-0">
                {item.icon({
                  className: [
                    "h-5 w-5 transition",
                    active ? "opacity-100" : "opacity-90 group-hover:opacity-100",
                  ].join(" "),
                }) as ReactNode}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Optional footer / version / user */}
      <div className="mt-auto px-6 py-4 text-xs text-white/60 border-t border-white/10">
        © {new Date().getFullYear()} Your Brand
      </div>
    </aside>
  );
}
