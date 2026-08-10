import React from "react";
import { ShieldAlert, Search } from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

const summaryCards = [
  { label: "EVENTS (30 DAYS)", value: "1,284", valueClass: "text-slate-900" },
  { label: "FAILED SIGN-INS", value: "3", valueClass: "text-amber-500" },
  { label: "ACTIVE SESSIONS", value: "4", valueClass: "text-slate-900" },
  { label: "TOKEN REVOCATIONS", value: "1", valueClass: "text-red-500" },
];

type Category =
  | "AUTH"
  | "TEMPLATE"
  | "INSPECTION"
  | "EXPORT"
  | "USER"
  | "SETTINGS";

const categoryStyles: Record<Category, string> = {
  AUTH: "bg-slate-100 text-slate-600",
  TEMPLATE: "bg-slate-100 text-slate-600",
  INSPECTION: "bg-slate-100 text-slate-600",
  EXPORT: "bg-slate-100 text-slate-600",
  USER: "bg-slate-100 text-slate-600",
  SETTINGS: "bg-slate-100 text-slate-600",
};

const auditEvents: {
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  category: Category;
}[] = [
  {
    timestamp: "2026-07-28 09:02",
    actor: "DANE WHITFIELD",
    action: "SIGNED IN",
    target: "ADMIN CONSOLE",
    ip: "73.14.220.8",
    category: "AUTH",
  },
  {
    timestamp: "2026-07-28 08:47",
    actor: "DANE WHITFIELD",
    action: "PUBLISHED TEMPLATE",
    target: "WEATHER BARRIER — RIGHT-ON V4",
    ip: "73.14.220.8",
    category: "TEMPLATE",
  },
  {
    timestamp: "2026-07-28 08:20",
    actor: "SYSTEM",
    action: "VENDOR CORRECTION RECEIVED",
    target: "DEF-4411",
    ip: "—",
    category: "INSPECTION",
  },
  {
    timestamp: "2026-07-27 18:11",
    actor: "TASHA LINDGREN",
    action: "EXPORTED DETAIL CSV",
    target: "VENDOR PERFORMANCE Q3",
    ip: "98.201.4.55",
    category: "EXPORT",
  },
  {
    timestamp: "2026-07-27 16:02",
    actor: "MONI ROY",
    action: "REJECTED CORRECTION",
    target: "DEF-4411",
    ip: "24.88.10.3",
    category: "INSPECTION",
  },
  {
    timestamp: "2026-07-27 09:31",
    actor: "DANE WHITFIELD",
    action: "DEACTIVATED USER",
    target: "CARL BENITEZ",
    ip: "73.14.220.8",
    category: "USER",
  },
  {
    timestamp: "2026-07-26 21:15",
    actor: "DANE WHITFIELD",
    action: "UPDATED PDF COMPRESSION",
    target: "REPORT SETTINGS",
    ip: "73.14.220.8",
    category: "SETTINGS",
  },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function SummaryCard({
  label,
  value,
  valueClass,
}: (typeof summaryCards)[number]) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <span className="text-[11px] font-semibold tracking-wide text-slate-400">
        {label}
      </span>
      <div className={`mt-2 text-3xl font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}

function AuditRow({ event }: { event: (typeof auditEvents)[number] }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-5 text-[12px] font-semibold text-slate-500">
        {event.timestamp}
      </td>
      <td className="py-5 pr-4 text-[13px] font-bold text-slate-800">
        {event.actor}
      </td>
      <td className="py-5 pr-4 text-[13px] font-bold text-slate-800">
        {event.action}
      </td>
      <td className="py-5 pr-4 text-[12px] font-semibold text-slate-500">
        {event.target}
      </td>
      <td className="py-5 pr-4 text-[12px] font-semibold text-slate-500">
        {event.ip}
      </td>
      <td className="py-5 pr-6">
        <span
          className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${categoryStyles[event.category]}`}
        >
          {event.category}
        </span>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function AuditLog() {
  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((c) => (
            <SummaryCard key={c.label} {...c} />
          ))}
        </div>

        {/* Append-only banner */}
        <div className="flex items-start gap-4 rounded-xl bg-[#0b1224] px-6 py-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <div className="text-xs font-bold tracking-widest text-white">
              APPEND-ONLY AUDIT TRAIL
            </div>
            <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
              ENTRIES CANNOT BE EDITED OR DELETED BY ANY ROLE, INCLUDING SUPER
              ADMINISTRATORS. EXPORTS ARE THEMSELVES LOGGED.
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="SEARCH ACTOR, ACTION, OR TARGET"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-[11px] font-semibold tracking-wide text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="w-full rounded-lg border border-slate-200 bg-white sm:w-72" />
        </div>

        {/* Audit table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  TIMESTAMP
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  ACTOR
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  ACTION
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  TARGET
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  IP
                </th>
                <th className="py-4 pr-6 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  CATEGORY
                </th>
              </tr>
            </thead>
            <tbody>
              {auditEvents.map((event, i) => (
                <AuditRow key={`${event.timestamp}-${i}`} event={event} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
