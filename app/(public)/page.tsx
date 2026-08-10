import React from "react";
import {
  ChevronDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Flame,
  ExternalLink,
} from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

const filters = [
  { label: "ALL JOBS" },
  { label: "ALL PHASES" },
  { label: "ALL VENDORS" },
  { label: "LAST 30 DAYS" },
];

const statCards = [
  {
    label: "OPEN DEFICIENCIES",
    value: "4",
    valueClass: "text-amber-500",
    sub: "ACROSS 3 ACTIVE JOBS",
    icon: AlertTriangle,
    iconClass: "text-slate-400",
  },
  {
    label: "OVERDUE",
    value: "2",
    valueClass: "text-red-500",
    sub: "PAST VENDOR CORRECTION DUE DATE",
    icon: Clock,
    iconClass: "text-slate-400",
  },
  {
    label: "READY FOR REVIEW",
    value: "1",
    valueClass: "text-slate-900",
    sub: "AWAITING PROOF VERIFICATION",
    icon: CheckCircle2,
    iconClass: "text-slate-400",
  },
  {
    label: "RIGHT-ON RATE",
    value: "93%",
    valueClass: "text-emerald-500",
    sub: "+3 PTS VS. LAST MONTH",
    icon: Flame,
    iconClass: "text-indigo-400",
  },
];

const vendorPerformance = [
  {
    name: "IRONLINE EXTERIORS",
    rate: 89,
    barClass: "bg-emerald-500",
    detail: "412 CORRECT · 28 DEFICIENCIES · 6.4% RATE",
  },
  {
    name: "COASTAL WATERPROOFING",
    rate: 63,
    barClass: "bg-red-500",
    detail: "188 CORRECT · 41 DEFICIENCIES · 17.9% RATE",
  },
  {
    name: "BARRETT FRAMING CO.",
    rate: 81,
    barClass: "bg-amber-500",
    detail: "356 CORRECT · 33 DEFICIENCIES · 8.5% RATE",
  },
  {
    name: "SUMMIT WINDOW & DOOR",
    rate: 94,
    barClass: "bg-emerald-500",
    detail: "221 CORRECT · 9 DEFICIENCIES · 3.9% RATE",
  },
];

type InspectionStatus = "LOCKED" | "SUBMITTED" | "DRAFT";

const statusStyles: Record<InspectionStatus, string> = {
  LOCKED: "bg-slate-900 text-white",
  SUBMITTED: "bg-white text-sky-600 border border-sky-300",
  DRAFT: "bg-amber-50 text-amber-700 border border-amber-200",
};

const recentInspections: {
  job: string;
  meta: string;
  status: InspectionStatus;
  score: string;
  deficiencies: string;
}[] = [
  {
    job: "218 CEDAR RIDGE LN",
    meta: "WEATHER BARRIER — RIGHT-ON V4 · PRIYA RAMAN · 2026-07-26",
    status: "LOCKED",
    score: "91%",
    deficiencies: "3 DEFICIENCIES",
  },
  {
    job: "4402 MARLOW ST",
    meta: "SHOWER WATERPROOFING V2 · MONI ROY · 2026-07-27",
    status: "SUBMITTED",
    score: "77%",
    deficiencies: "5 DEFICIENCIES",
  },
  {
    job: "312 WEXLER COURT",
    meta: "FRAMING QUALITY WALK V1 · PRIYA RAMAN · 2026-07-28",
    status: "DRAFT",
    score: "67%",
    deficiencies: "1 DEFICIENCIES",
  },
  {
    job: "312 WEXLER COURT",
    meta: "WEATHER BARRIER — RIGHT-ON V4 · TASHA LINDGREN · 2026-07-24",
    status: "LOCKED",
    score: "88%",
    deficiencies: "4 DEFICIENCIES",
  },
];

const urgentJobs = [
  {
    job: "218 CEDAR RIDGE LN",
    meta: "#1041 · WEATHER BARRIER · PM MONI ROY",
    count: 2,
  },
  {
    job: "4402 MARLOW ST",
    meta: "#1038 · WATERPROOFING · PM TASHA LINDGREN",
    count: 4,
  },
  {
    job: "312 WEXLER COURT",
    meta: "#1047 · ROUGH-IN · PM MONI ROY",
    count: 1,
  },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-700 hover:bg-slate-50 transition-colors"
    >
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function StatCard({
  label,
  value,
  valueClass,
  sub,
  icon: Icon,
  iconClass,
}: (typeof statCards)[number]) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-slate-400">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${iconClass}`} />
      </div>
      <div className={`mt-2 text-3xl font-bold ${valueClass}`}>{value}</div>
      <div className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
        {sub}
      </div>
    </div>
  );
}

function VendorRow({
  name,
  rate,
  barClass,
  detail,
}: (typeof vendorPerformance)[number]) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wide text-slate-800">
          {name}
        </span>
        <span className="text-sm font-bold text-slate-900">{rate}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${rate}%` }}
        />
      </div>
      <div className="mt-1.5 text-[10px] font-medium tracking-wide text-slate-400">
        {detail}
      </div>
    </div>
  );
}

function InspectionRow({
  job,
  meta,
  status,
  score,
  deficiencies,
}: (typeof recentInspections)[number]) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="text-[13px] font-bold text-slate-800">{job}</div>
        <div className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
          {meta}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span
          className={`rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${statusStyles[status]}`}
        >
          {status}
        </span>
        <div className="text-right">
          <div className="text-sm font-bold text-slate-900">{score}</div>
          <div className="text-[10px] font-medium tracking-wide text-slate-400">
            {deficiencies}
          </div>
        </div>
      </div>
    </div>
  );
}

function UrgentJobRow({ job, meta, count }: (typeof urgentJobs)[number]) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-slate-800">{job}</span>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-500">
          {count}
        </span>
      </div>
      <div className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
        {meta}
      </div>
      <button
        type="button"
        className="mt-2 flex items-center gap-1 text-[10px] font-bold tracking-wide text-amber-600 hover:text-amber-700"
      >
        OPEN IN JOBTREAD
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Dashboard
// ------------------------------------------------------------------

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-4">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400">
              FILTER
            </span>
            <div className="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
              {filters.map((f) => (
                <FilterDropdown key={f.label} label={f.label} />
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Right-On Quality Trend */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-widest text-slate-800">
              RIGHT-ON QUALITY TREND
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
              SHARE OF CHECKLIST ITEMS CORRECTLY INSTALLED ON FIRST PASS
            </p>
            <div className="mt-6 h-64 border-t border-slate-100">
              {/* Chart placeholder — plug a chart lib (recharts) in here */}
              <div className="flex h-full items-center justify-center text-[11px] font-medium tracking-wide text-slate-300">
                No chart data for the selected range
              </div>
            </div>
          </div>

          {/* Vendor Performance */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xs font-bold tracking-widest text-slate-800">
              VENDOR PERFORMANCE
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
              FIRST-PASS QUALITY, CURRENT FILTER
            </p>
            <div className="mt-2 divide-y divide-slate-100">
              {vendorPerformance.map((v) => (
                <VendorRow key={v.name} {...v} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Inspections */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-widest text-slate-800">
              RECENT INSPECTIONS
            </h3>
            <div className="mt-2 divide-y divide-slate-100">
              {recentInspections.map((row, i) => (
                <InspectionRow key={`${row.job}-${i}`} {...row} />
              ))}
            </div>
          </div>

          {/* Urgent Jobs */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xs font-bold tracking-widest text-slate-800">
              URGENT JOBS
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
              JOBS WITH OVERDUE CORRECTIONS
            </p>
            <div className="mt-2 divide-y divide-slate-100">
              {urgentJobs.map((row, i) => (
                <UrgentJobRow key={`${row.job}-${i}`} {...row} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}