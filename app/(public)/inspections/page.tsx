"use client";

import React, { useMemo, useState } from "react";
import { Search, X, Lock, FileText } from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

type Status = "DRAFT" | "SUBMITTED" | "LOCKED";
type Tab = "ALL" | Status;

type Deficiency = {
  title: string;
  meta: string;
  severity: "CRITICAL" | "FINISH READINESS";
  state: "READY FOR REVIEW" | "REWORK REQUESTED";
};

type Inspection = {
  id: string;
  job: string;
  template: string;
  version: string;
  phase: string;
  inspector: string;
  date: string;
  rightOn: number;
  totalItems: number;
  defCount: number;
  photos: number;
  status: Status;
  deficiencies: Deficiency[];
};

const inspections: Inspection[] = [
  {
    id: "INS-20260726-01",
    job: "218 CEDAR RIDGE LN",
    template: "WEATHER BARRIER — RIGHT-ON",
    version: "V4",
    phase: "WEATHER BARRIER",
    inspector: "PRIYA RAMAN",
    date: "2026-07-26",
    rightOn: 31,
    totalItems: 34,
    defCount: 3,
    photos: 48,
    status: "LOCKED",
    deficiencies: [
      {
        title: 'WRB LAPS SHINGLED A MINIMUM OF 6" HORIZONTALLY',
        meta: "DEF-4411 · IRONLINE EXTERIORS",
        severity: "CRITICAL",
        state: "READY FOR REVIEW",
      },
      {
        title: "HANGERS FULLY NAILED PER SCHEDULE",
        meta: "DEF-4390 · BARRETT FRAMING CO.",
        severity: "FINISH READINESS",
        state: "REWORK REQUESTED",
      },
    ],
  },
  {
    id: "INS-20260727-02",
    job: "4402 MARLOW ST",
    template: "SHOWER WATERPROOFING",
    version: "V2",
    phase: "WATERPROOFING",
    inspector: "MONI ROY",
    date: "2026-07-27",
    rightOn: 17,
    totalItems: 22,
    defCount: 5,
    photos: 31,
    status: "SUBMITTED",
    deficiencies: [
      {
        title: "PAN LINER OVERLAP MEETS MIN. SPEC",
        meta: "DEF-4408 · COASTAL WATERPROOFING",
        severity: "CRITICAL",
        state: "READY FOR REVIEW",
      },
    ],
  },
  {
    id: "INS-20260728-03",
    job: "312 WEXLER COURT",
    template: "FRAMING QUALITY WALK",
    version: "V1",
    phase: "ROUGH-IN",
    inspector: "PRIYA RAMAN",
    date: "2026-07-28",
    rightOn: 12,
    totalItems: 18,
    defCount: 1,
    photos: 14,
    status: "DRAFT",
    deficiencies: [
      {
        title: "HANGERS FULLY NAILED PER SCHEDULE",
        meta: "DEF-4390 · BARRETT FRAMING CO.",
        severity: "FINISH READINESS",
        state: "REWORK REQUESTED",
      },
    ],
  },
  {
    id: "INS-20260724-04",
    job: "312 WEXLER COURT",
    template: "WEATHER BARRIER — RIGHT-ON",
    version: "V4",
    phase: "WEATHER BARRIER",
    inspector: "TASHA LINDGREN",
    date: "2026-07-24",
    rightOn: 30,
    totalItems: 34,
    defCount: 4,
    photos: 57,
    status: "LOCKED",
    deficiencies: [
      {
        title: 'WRB LAPS SHINGLED A MINIMUM OF 6" HORIZONTALLY',
        meta: "DEF-4411 · IRONLINE EXTERIORS",
        severity: "CRITICAL",
        state: "READY FOR REVIEW",
      },
    ],
  },
];

const tabLabels: { key: Tab; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "DRAFT", label: "DRAFT" },
  { key: "SUBMITTED", label: "SUBMITTED" },
  { key: "LOCKED", label: "LOCKED" },
];

const statusStyles: Record<Status, string> = {
  DRAFT: "bg-amber-50 text-amber-700 border border-amber-200",
  SUBMITTED: "bg-sky-50 text-sky-600 border border-sky-200",
  LOCKED: "bg-slate-900 text-white",
};

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function SummaryCard({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string | number;
  valueClass: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <span className="text-[11px] font-semibold tracking-wide text-slate-400">
        {label}
      </span>
      <div className={`mt-2 text-3xl font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-[10px] font-bold tracking-wide ${statusStyles[status]}`}
    >
      {status === "LOCKED" && <Lock className="h-3 w-3" />}
      {status}
    </span>
  );
}

function InspectionRow({
  inspection,
  onOpen,
}: {
  inspection: Inspection;
  onOpen: () => void;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-5">
        <div className="text-[11px] font-semibold tracking-wide text-slate-500">
          {inspection.id}
        </div>
        <div className="mt-0.5 text-[13px] font-bold text-slate-900">
          {inspection.job}
        </div>
      </td>
      <td className="py-5 pr-4">
        <span className="text-[12px] font-bold text-slate-700">
          {inspection.template}
        </span>
        <span className="ml-1 text-[11px] font-semibold text-slate-400">
          · {inspection.version}
        </span>
      </td>
      <td className="py-5 pr-4 text-[11px] font-bold tracking-wide text-slate-700">
        {inspection.phase}
      </td>
      <td className="py-5 pr-4 text-[12px] font-bold text-slate-700">
        {inspection.inspector}
      </td>
      <td className="py-5 pr-4 text-[12px] font-semibold text-slate-500">
        {inspection.date}
      </td>
      <td className="py-5 pr-4 text-[12px] font-bold text-slate-800">
        {inspection.rightOn}/{inspection.totalItems} RIGHT-ON ·{" "}
        {inspection.defCount} DEF
      </td>
      <td className="py-5 pr-4">
        <StatusBadge status={inspection.status} />
      </td>
      <td className="py-5 pr-6">
        <button
          type="button"
          onClick={onOpen}
          className="cursor-pointer text-[11px] font-bold tracking-wide text-slate-800 hover:text-slate-950"
        >
          OPEN
        </button>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------------
// Detail modal
// ------------------------------------------------------------------

function InspectionModal({
  inspection,
  onClose,
}: {
  inspection: Inspection;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="text-[15px] font-bold text-slate-900">
              {inspection.id}
            </div>
            <div className="mt-0.5 text-[11px] font-semibold tracking-wide text-slate-400">
              {inspection.job} · {inspection.template} {inspection.version} ·{" "}
              {inspection.inspector}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Read-only banner */}
          <div className="flex items-start gap-3 rounded-xl bg-[#0b1224] px-5 py-4">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="text-[11px] font-medium leading-relaxed tracking-wide text-slate-300">
              READ-ONLY RECORD. TEMPLATE {inspection.version} IS PRESERVED
              EXACTLY AS USED AT CAPTURE TIME. CORRECTIONS AND ADMINISTRATIVE
              AMENDMENTS ARE APPENDED, NEVER OVERWRITTEN.
            </p>
          </div>

          {/* Stat grid */}
          <div className="mt-5 grid grid-cols-4 gap-3">
            <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-4">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                ITEMS
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">
                {inspection.totalItems}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-4">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                RIGHT-ON
              </div>
              <div className="mt-1 text-xl font-bold text-emerald-600">
                {inspection.rightOn}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-4">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                DEFICIENCIES
              </div>
              <div className="mt-1 text-xl font-bold text-red-500">
                {inspection.defCount}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-4">
              <div className="text-[10px] font-semibold tracking-wide text-slate-400">
                PHOTOS
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900">
                {inspection.photos}
              </div>
            </div>
          </div>

          {/* Deficiencies */}
          <div className="mt-6">
            <div className="text-[11px] font-bold tracking-widest text-slate-800">
              DEFICIENCIES RAISED
            </div>
            <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200">
              {inspection.deficiencies.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">
                      {d.title}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold tracking-wide text-slate-400">
                      {d.meta}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${
                        d.severity === "CRITICAL"
                          ? "bg-rose-50 text-rose-500 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {d.severity}
                    </span>
                    <span className="rounded bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-600">
                      {d.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div className="mt-6">
            <div className="text-[11px] font-bold tracking-widest text-slate-800">
              EVIDENCE
            </div>
            <div className="mt-3 grid grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-20 items-center justify-center rounded-lg bg-[#f0ece2] text-[10px] font-semibold tracking-wide text-slate-400"
                >
                  PHOTO
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-[11px] font-bold tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
          >
            CLOSE
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-[11px] font-bold tracking-wide text-slate-900 hover:bg-amber-600 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            GENERATE PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function InspectionsPage() {
  const [tab, setTab] = useState<Tab>("ALL");
  const [search, setSearch] = useState("");
  const [openInspection, setOpenInspection] = useState<Inspection | null>(
    null
  );

  const counts = useMemo(
    () => ({
      DRAFT: inspections.filter((i) => i.status === "DRAFT").length,
      SUBMITTED: inspections.filter((i) => i.status === "SUBMITTED").length,
      LOCKED: inspections.filter((i) => i.status === "LOCKED").length,
      photos: inspections.reduce((sum, i) => sum + i.photos, 0),
    }),
    []
  );

  const visible = inspections.filter(
    (i) =>
      (tab === "ALL" || i.status === tab) &&
      (search.trim() === "" ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.job.toLowerCase().includes(search.toLowerCase()) ||
        i.inspector.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1620px] space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="DRAFTS"
            value={counts.DRAFT}
            valueClass="text-slate-900"
          />
          <SummaryCard
            label="SUBMITTED"
            value={counts.SUBMITTED}
            valueClass="text-amber-500"
          />
          <SummaryCard
            label="LOCKED RECORDS"
            value={counts.LOCKED}
            valueClass="text-slate-900"
          />
          <SummaryCard
            label="PHOTOS CAPTURED"
            value={counts.photos}
            valueClass="text-emerald-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200">
          {tabLabels.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`cursor-pointer pb-3 text-xs font-bold tracking-widest transition-colors ${
                tab === t.key
                  ? "border-b-2 border-amber-500 text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH BY INSPECTION ID, JOB, OR INSPECTOR"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-[11px] font-semibold tracking-wide text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="w-full rounded-lg border border-slate-200 bg-white sm:w-64" />
        </div>

        {/* Inspections table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <table className="w-full min-w-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  INSPECTION
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  TEMPLATE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  PHASE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  INSPECTOR
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  DATE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  RESULT
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  STATUS
                </th>
                <th className="py-4 pr-6 text-left text-[10px] font-semibold tracking-widest text-slate-400" />
              </tr>
            </thead>
            <tbody>
              {visible.map((inspection) => (
                <InspectionRow
                  key={inspection.id}
                  inspection={inspection}
                  onOpen={() => setOpenInspection(inspection)}
                />
              ))}
              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-[12px] font-semibold tracking-wide text-slate-400"
                  >
                    NO INSPECTIONS MATCH THIS FILTER
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openInspection && (
        <InspectionModal
          inspection={openInspection}
          onClose={() => setOpenInspection(null)}
        />
      )}
    </div>
  );
}
