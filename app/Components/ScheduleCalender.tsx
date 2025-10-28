"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ---- Types ----
type EventColor = "blue" | "amber";
type CalEvent = {
  id: string;
  title: string;
  date: string; // ISO date, e.g., "2025-05-01"
  start: string; // "09:00" 24h
  end: string; // "13:00"
  color?: EventColor;
  countBadge?: string; // e.g., "2+" or "3+"
};

// ---- Sample data (match your screenshot vibe) ----
const SAMPLE_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "Wheel Fixing",
    date: "2025-05-01",
    start: "09:00",
    end: "10:00",
    color: "blue",
  },
  {
    id: "e2",
    title: "Car Wash",
    date: "2025-05-02",
    start: "09:00",
    end: "11:00",
    color: "amber",
  },
  {
    id: "e3",
    title: "Wheel Fixing",
    date: "2025-05-02",
    start: "11:00",
    end: "13:00",
    color: "blue",
    countBadge: "2+",
  },
  {
    id: "e4",
    title: "Car Wash",
    date: "2025-05-04",
    start: "09:00",
    end: "11:00",
    color: "amber",
    countBadge: "3+",
  },
  {
    id: "e5",
    title: "Car Wash",
    date: "2025-05-06",
    start: "10:00",
    end: "11:00",
    color: "amber",
  },
  {
    id: "e6",
    title: "Wheel Fixing",
    date: "2025-05-06",
    start: "12:00",
    end: "13:00",
    color: "blue",
  },
  {
    id: "e7",
    title: "Wheel Fixing",
    date: "2025-05-01",
    start: "16:00",
    end: "18:00",
    color: "blue",
  },
  {
    id: "e8",
    title: "Wheel Fixing",
    date: "2025-05-04",
    start: "16:00",
    end: "18:00",
    color: "blue",
  },
  {
    id: "e9",
    title: "Exterior Wash",
    date: "2025-05-06",
    start: "15:00",
    end: "17:00",
    color: "amber",
  },
  {
    id: "e10",
    title: "Engine wash",
    date: "2025-05-07",
    start: "15:00",
    end: "18:00",
    color: "amber",
  },
];

// ---- Config ----
const START_HOUR = 9; // 09:00
const END_HOUR = 18; // 18:00
const HOUR_HEIGHT = 72; // px per hour (adjust for density)

// ---- Small date utils (no external libs) ----
const toDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmtMonthYear = (d: Date) =>
  d.toLocaleString(undefined, { month: "long", year: "numeric" });

const fmtRange = (start: Date, end: Date) =>
  `${start.getDate().toString().padStart(2, "0")} ${start.toLocaleString(
    undefined,
    { month: "short" },
  )} - ${end.getDate().toString().padStart(2, "0")} ${end.toLocaleString(
    undefined,
    { month: "short" },
  )} ${end.getFullYear()}`;

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, m: number) =>
  new Date(d.getFullYear(), d.getMonth() + m, 1);
const startOfWeekSun = (d: Date) => {
  const nd = new Date(d);
  const day = nd.getDay(); // 0=Sun
  nd.setDate(nd.getDate() - day);
  nd.setHours(0, 0, 0, 0);
  return nd;
};
const addDays = (d: Date, days: number) => {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
};
const sameYMD = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// minutes since 09:00 (START_HOUR)
const minutesFromStart = (time: string) => {
  const [hh, mm] = time.split(":").map(Number);
  return (hh - START_HOUR) * 60 + mm;
};

// ---- Color styles per event ----
const colorClasses: Record<
  EventColor,
  {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-700",
    badgeBg: "bg-blue-500",
    badgeText: "text-white",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-700",
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
  },
};

// ---- Main ----
export default function ScheduleCalendar({
  events = SAMPLE_EVENTS,
}: {
  events?: CalEvent[];
}) {
  const [anchorMonth, setAnchorMonth] = React.useState<Date>(
    new Date(2025, 4, 1),
  ); // May 2025 (month is 0-based)
  const monthStart = startOfMonth(anchorMonth);
  const weekStart = startOfWeekSun(monthStart);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd = addDays(weekStart, 6);

  // events grouped by day
  const eventsByDay: Record<string, CalEvent[]> = React.useMemo(() => {
    const map: Record<string, CalEvent[]> = {};
    // derive the displayed week days from weekStart to avoid depending on a possibly mutable array
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    days.forEach((d) => {
      map[d.toDateString()] = [];
    });
    events.forEach((ev) => {
      const d = toDate(ev.date);
      // only render events that fall within this displayed week
      if (d >= weekStart && d <= weekEnd) {
        map[d.toDateString()]?.push(ev);
      }
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart.getTime(), weekEnd.getTime(), JSON.stringify(events)]);

  const totalMinutes = (END_HOUR - START_HOUR) * 60;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-semibold">Schedule Calendar</h3>

        <div className="flex items-center gap-3">
          {/* Filter (fake) */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schedule</SelectItem>
              <SelectItem value="car-wash">Car Wash</SelectItem>
              <SelectItem value="wheel-fixing">Wheel Fixing</SelectItem>
            </SelectContent>
          </Select>

          {/* Month nav */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAnchorMonth((d) => addMonths(d, -1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-2 text-sm font-medium">
              {fmtMonthYear(monthStart)}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAnchorMonth((d) => addMonths(d, +1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* View dropdown (static) */}
          <Select defaultValue="weekly">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              {/* (Add monthly later if you wish) */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-3 text-right text-xs text-muted-foreground">
        Showing {fmtRange(weekStart, weekEnd)}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[980px] rounded-lg border border-gray-200 bg-[#F8FAFC] p-2">
          {/* Header row: Time + 7 days */}
          <div className="grid grid-cols-[84px_repeat(7,1fr)] items-stretch gap-0 rounded-md bg-white">
            {/* Time header cell */}
            <div className="h-12 border-b border-r border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600">
              Time
            </div>
            {weekDays.map((d, idx) => {
              const dayNum = d.getDate();
              const weekday = d.toLocaleDateString(undefined, {
                weekday: "short",
              }); // Sun, Mon...
              const isToday = sameYMD(d, new Date());
              return (
                <div
                  key={idx}
                  className="h-12 border-b border-r border-gray-200 bg-white px-3 py-2"
                >
                  <div className="flex items-end justify-between">
                    <div className="text-xs text-gray-500">{weekday}</div>
                    <div
                      className={`text-base font-semibold ${
                        isToday ? "text-blue-600" : "text-gray-800"
                      }`}
                    >
                      {dayNum}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Body: time column + day columns */}
          <div className="grid grid-cols-[84px_repeat(7,1fr)]">
            {/* Time rail */}
            <div className="border-r border-gray-200 bg-white">
              {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
                const hour = START_HOUR + i;
                const label = new Date(0, 0, 0, hour)
                  .toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toLowerCase();
                return (
                  <div
                    key={hour}
                    className="relative h-[72px] border-b border-gray-100 px-3 text-[11px] leading-[72px] text-gray-600"
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Day columns */}
            {weekDays.map((day, idx) => {
              const dayKey = day.toDateString();
              const todaysEvents = (eventsByDay[dayKey] ?? []).sort(
                (a, b) => minutesFromStart(a.start) - minutesFromStart(b.start),
              );

              return (
                <div
                  key={idx}
                  className="relative border-r border-gray-200 bg-white"
                  style={{
                    height: (END_HOUR - START_HOUR) * HOUR_HEIGHT + HOUR_HEIGHT,
                  }} // rows + final baseline
                >
                  {/* hour grid lines */}
                  {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => (
                    <div
                      key={i}
                      className={`absolute left-0 right-0 border-b ${
                        i === 0 ? "border-gray-100" : "border-gray-100/80"
                      }`}
                      style={{ top: i * HOUR_HEIGHT }}
                    />
                  ))}

                  {/* events */}
                  {todaysEvents.map((ev) => {
                    const top = (minutesFromStart(ev.start) / 60) * HOUR_HEIGHT;
                    const height =
                      ((minutesFromStart(ev.end) - minutesFromStart(ev.start)) /
                        60) *
                      HOUR_HEIGHT;

                    const c = colorClasses[ev.color ?? "blue"];

                    return (
                      <div
                        key={ev.id}
                        className={`absolute mx-2 overflow-hidden rounded-md border ${c.border} ${c.bg} ${c.text} shadow-sm`}
                        style={{ top, height }}
                      >
                        <div className="flex items-start gap-2 p-2 text-xs">
                          {ev.countBadge && (
                            <span
                              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${c.badgeBg} ${c.badgeText}`}
                              title={`${ev.countBadge} more`}
                            >
                              {ev.countBadge}
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className="truncate font-medium">
                              {ev.title}
                            </div>
                            <div className="text-[11px] opacity-80">
                              {ev.start} - {ev.end}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
