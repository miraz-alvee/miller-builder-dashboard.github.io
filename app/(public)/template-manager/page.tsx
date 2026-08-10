"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Copy,
  GitBranch,
  Archive as ArchiveIcon,
} from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

type Status = "PUBLISHED" | "DRAFTS" | "ARCHIVED";

type Template = {
  id: string;
  name: string;
  trade: string;
  updated: string;
  usedBy: string;
  sections: number;
  checklistItems: number;
  itemStates: number;
  version: string;
  status: Status;
};

const templates: Template[] = [
  // Published
  {
    id: "t1",
    name: "WEATHER BARRIER — RIGHT-ON",
    trade: "WEATHER BARRIER",
    updated: "2026-02-02",
    usedBy: "61 LOCKED INSPECTIONS",
    sections: 4,
    checklistItems: 22,
    itemStates: 3,
    version: "V4",
    status: "PUBLISHED",
  },
  {
    id: "t2",
    name: "SHOWER WATERPROOFING",
    trade: "WATERPROOFING",
    updated: "2026-01-18",
    usedBy: "34 LOCKED INSPECTIONS",
    sections: 3,
    checklistItems: 15,
    itemStates: 3,
    version: "V2",
    status: "PUBLISHED",
  },
  // Drafts
  {
    id: "t3",
    name: "WEATHER BARRIER — RIGHT-ON",
    trade: "WEATHER BARRIER",
    updated: "2026-02-02",
    usedBy: "61 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V3",
    status: "DRAFTS",
  },
  {
    id: "t4",
    name: "WEATHER BARRIER — RIGHT-ON",
    trade: "WEATHER BARRIER",
    updated: "2026-02-02",
    usedBy: "61 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V3",
    status: "DRAFTS",
  },
  {
    id: "t5",
    name: "WEATHER BARRIER — RIGHT-ON",
    trade: "WEATHER BARRIER",
    updated: "2026-02-02",
    usedBy: "61 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V3",
    status: "DRAFTS",
  },
  {
    id: "t6",
    name: "FRAMING QUALITY WALK",
    trade: "FRAMING",
    updated: "2026-01-30",
    usedBy: "12 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V1",
    status: "DRAFTS",
  },
  {
    id: "t7",
    name: "ROUGH-IN PLUMBING",
    trade: "PLUMBING",
    updated: "2026-01-22",
    usedBy: "9 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V1",
    status: "DRAFTS",
  },
  {
    id: "t8",
    name: "FINISH READINESS",
    trade: "FINISH",
    updated: "2026-01-10",
    usedBy: "5 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V1",
    status: "DRAFTS",
  },
  // Archived
  {
    id: "t9",
    name: "WEATHER BARRIER — RIGHT-ON",
    trade: "WEATHER BARRIER",
    updated: "2026-02-02",
    usedBy: "61 LOCKED INSPECTIONS",
    sections: 0,
    checklistItems: 0,
    itemStates: 3,
    version: "V3",
    status: "ARCHIVED",
  },
];

const tabLabels: { key: Status; label: string }[] = [
  { key: "PUBLISHED", label: "PUBLISHED" },
  { key: "DRAFTS", label: "DRAFTS" },
  { key: "ARCHIVED", label: "ARCHIVED" },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function IconButton({
  icon,
  label,
  variant = "default",
}: {
  icon?: React.ReactNode;
  label: string;
  variant?: "default" | "primary";
}) {
  if (variant === "primary") {
    return (
      <button
        type="button"
        className="rounded-lg bg-amber-500 px-5 py-2.5 text-[11px] font-bold tracking-wide text-slate-900 hover:bg-amber-600 transition-colors"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[11px] font-bold tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-bold text-slate-900">
          {template.name}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded bg-slate-900 px-2 py-1 text-[10px] font-bold tracking-wide text-white">
            {template.version}
          </span>
          <span
            className={`rounded px-2 py-1 text-[10px] font-bold tracking-wide ${
              template.status === "PUBLISHED"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : template.status === "DRAFTS"
                  ? "bg-sky-50 text-sky-600 border border-sky-200"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
            }`}
          >
            {template.status === "DRAFTS" ? "ARCHIVED" : template.status}
          </span>
        </div>
      </div>

      <div className="mt-2 text-[11px] font-semibold tracking-wide text-slate-400">
        {template.trade} · UPDATED {template.updated} · USED BY{" "}
        {template.usedBy}
      </div>

      <div className="mt-4 text-[11px] font-semibold tracking-wide text-slate-500">
        {template.sections} SECTIONS · {template.checklistItems} CHECKLIST ITEMS
        · {template.itemStates} ITEM STATES
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <IconButton icon={<Eye className="h-3.5 w-3.5" />} label="VIEW" />
        <IconButton icon={<Eye className="h-3.5 w-3.5" />} label="PREVIEW" />
        <IconButton icon={<Copy className="h-3.5 w-3.5" />} label="DUPLICATE" />
        <IconButton
          icon={<GitBranch className="h-3.5 w-3.5" />}
          label="NEW VERSION"
        />
        {template.status === "DRAFTS" && (
          <IconButton label="PUBLISH" variant="primary" />
        )}
        {template.status === "PUBLISHED" && (
          <IconButton
            icon={<ArchiveIcon className="h-3.5 w-3.5" />}
            label="ARCHIVE"
          />
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function TemplateManagerPage() {
  const [tab, setTab] = useState<Status>("PUBLISHED");
  const [search, setSearch] = useState("");

  const counts = useMemo(
    () => ({
      PUBLISHED: templates.filter((t) => t.status === "PUBLISHED").length,
      DRAFTS: templates.filter((t) => t.status === "DRAFTS").length,
      ARCHIVED: templates.filter((t) => t.status === "ARCHIVED").length,
    }),
    [],
  );

  const visible = templates.filter(
    (t) =>
      t.status === tab &&
      (search.trim() === "" ||
        t.name.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1620px] space-y-6">
        {/* Search bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH TEMPLATES"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-[11px] font-semibold tracking-wide text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="w-full rounded-lg border border-slate-200 bg-white sm:w-64" />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200">
          {tabLabels.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`cursor-pointer flex items-center gap-2 pb-3 text-xs font-bold tracking-widest transition-colors ${
                tab === t.key
                  ? "border-b-2 border-amber-500 text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.label}
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  tab === t.key
                    ? "bg-slate-100 text-slate-700"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Template cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {visible.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
          {visible.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-[12px] font-semibold tracking-wide text-slate-400">
              NO TEMPLATES IN THIS TAB
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
