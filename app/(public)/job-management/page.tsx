import React from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

const summaryCards = [
  {
    label: "TOTAL JOBS",
    value: "5",
    valueClass: "text-slate-900",
    sub: "SYNCED FROM JOBTREAD",
  },
  {
    label: "ACTIVE",
    value: "3",
    valueClass: "text-emerald-600",
    sub: "",
  },
  {
    label: "PRECONSTRUCTION",
    value: "1",
    valueClass: "text-slate-900",
    sub: "",
  },
  {
    label: "CLOSED",
    value: "1",
    valueClass: "text-slate-900",
    sub: "",
  },
];

const filters = [
  "ALL JOBS",
  "ALL PHASES",
  "ALL VENDORS",
  "JOBTREAD JOB STATUS",
];

type JobStatus = "ACTIVE" | "PRECONSTRUCTION" | "CLOSED";

const statusStyles: Record<JobStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  PRECONSTRUCTION: "bg-sky-50 text-sky-600 border border-sky-200",
  CLOSED: "bg-slate-100 text-slate-500 border border-slate-200",
};

const jobs: {
  name: string;
  meta: string;
  status: JobStatus;
  phase: string;
  pm: string;
  super_: string;
  open: number;
  overdue: number;
  rightOn: string;
  jobtreadId: string;
}[] = [
  {
    name: "218 CEDAR RIDGE LN",
    meta: "#1041 · HALVORSEN RESIDENCE",
    status: "ACTIVE",
    phase: "WEATHER BARRIER",
    pm: "MONI ROY",
    super_: "PRIYA RAMAN",
    open: 6,
    overdue: 2,
    rightOn: "91%",
    jobtreadId: "JT-88213",
  },
  {
    name: "4402 MARLOW ST",
    meta: "#1038 · BEAUMONT CUSTOM BUILD",
    status: "ACTIVE",
    phase: "WATERPROOFING",
    pm: "TASHA LINDGREN",
    super_: "PRIYA RAMAN",
    open: 11,
    overdue: 4,
    rightOn: "78%",
    jobtreadId: "JT-88190",
  },
  {
    name: "77 LARKSPUR WAY",
    meta: "#1052 · NGUYEN ADDITION",
    status: "PRECONSTRUCTION",
    phase: "PRECONSTRUCTION",
    pm: "MONI ROY",
    super_: "CARL BENITEZ",
    open: 0,
    overdue: 0,
    rightOn: "100%",
    jobtreadId: "JT-88301",
  },
  {
    name: "1900 ASHFORD TERRACE",
    meta: "#1015 · KEPLER RENOVATION",
    status: "CLOSED",
    phase: "FINISH READINESS",
    pm: "TASHA LINDGREN",
    super_: "PRIYA RAMAN",
    open: 0,
    overdue: 0,
    rightOn: "96%",
    jobtreadId: "JT-87944",
  },
  {
    name: "312 WEXLER COURT",
    meta: "#1047 · OSTRANDER RESIDENCE",
    status: "ACTIVE",
    phase: "ROUGH-IN",
    pm: "MONI ROY",
    super_: "PRIYA RAMAN",
    open: 3,
    overdue: 1,
    rightOn: "88%",
    jobtreadId: "JT-88255",
  },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function SummaryCard({
  label,
  value,
  valueClass,
  sub,
}: (typeof summaryCards)[number]) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <span className="text-[11px] font-semibold tracking-wide text-slate-400">
        {label}
      </span>
      <div className={`mt-2 text-3xl font-bold ${valueClass}`}>{value}</div>
      {sub && (
        <div className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
          {sub}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200/70 bg-white px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 shadow-sm hover:bg-slate-50 transition-colors"
    >
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function JobRow({ job }: { job: (typeof jobs)[number] }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-5 pr-4">
        <div className="text-[13px] font-bold text-slate-800">{job.name}</div>
        <div className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
          {job.meta}
        </div>
      </td>
      <td className="py-5 pr-4">
        <span
          className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${statusStyles[job.status]}`}
        >
          {job.status}
        </span>
      </td>
      <td className="py-5 pr-4 text-[11px] font-bold tracking-wide text-slate-700">
        {job.phase}
      </td>
      <td className="py-5 pr-4">
        <div className="text-[11px] font-semibold text-slate-700">
          PM · {job.pm}
        </div>
        <div className="mt-0.5 text-[11px] font-semibold text-slate-700">
          SUPER · {job.super_}
        </div>
      </td>
      <td className="py-5 pr-4">
        <span className="text-[13px] font-bold text-slate-800">{job.open}</span>
        <span className="text-[13px] font-bold text-slate-300"> / </span>
        <span className="text-[13px] font-bold text-red-500">
          {job.overdue}
        </span>
      </td>
      <td className="py-5 pr-4 text-[13px] font-bold text-slate-800">
        {job.rightOn}
      </td>
      <td className="py-5 pr-6">
        <a
          href="#"
          className="flex items-center gap-1 text-[12px] font-bold tracking-wide text-amber-600 hover:text-amber-700"
        >
          {job.jobtreadId}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function JobsList() {
  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((c) => (
            <SummaryCard key={c.label} {...c} />
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filters.map((f) => (
            <FilterDropdown key={f} label={f} />
          ))}
        </div>

        {/* Jobs table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  JOB
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  STATUS
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  CURRENT PHASE
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  ASSIGNED TEAM
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  OPEN / OVERDUE
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  RIGHT-ON
                </th>
                <th className="px-0 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  JOBTREAD
                </th>
              </tr>
            </thead>
            <tbody className="px-6">
              {jobs.map((job) => (
                <JobRow key={job.jobtreadId} job={job} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
