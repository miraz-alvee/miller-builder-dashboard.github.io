"use client"

import { useState } from "react"
import { Database, FileText, Plug, Check } from "lucide-react"
import { SyncSourceId, LastRunSummary, VendorStat} from "@/data-types/jobtread-types";
import { MOCK_LAST_RUN, MOCK_VENDORS, SYNC_SOURCES } from "@/mock_data/jobtread-data";


const inputClasses =
    "font-bebas w-full rounded-md border border-[#DDD6C8] bg-white px-3 py-2.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33]"

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        checked ? "bg-[#D4A017]" : "bg-[#00000022]"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}



function SourceIcon({ id }: { id: SyncSourceId }) {
    if (id === "mock") return <Database className="h-4 w-4" />
    if (id === "csv") return <FileText className="h-4 w-4" />
    return <Plug className="h-4 w-4" />
}

function SettingRow({
    title,
    description,
    checked,
    onChange,
}: {
    title: string
    description: string
    checked: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <div className="flex items-start justify-between gap-4 py-4">
            <div>
                <p className="font-bebas text-sm leading-5 font-medium uppercase tracking-wider text-[#111A2B] sm:text-sm">{title}</p>
                <p className="mt-1 font-bebas font-medium text-xs leading-5 text-[#4A5875]">{description}</p>
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    )
}

function LastRunPanel({ run }: { run: LastRunSummary }) {
    const rows: { label: string; value: string | number }[] = [
        { label: "Status", value: run.status },
        { label: "Started", value: run.started },
        { label: "Duration", value: `${run.durationSeconds}S` },
        { label: "Jobs Created", value: run.jobsCreated },
        { label: "Jobs Updated", value: run.jobsUpdated },
        { label: "Unmatched", value: run.unmatched },
    ]

    return (
        <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 font-bebas font-medium text-sm leading-5 uppercase tracking-wider text-[#111A2B]">Last Run</h2>
            <div className="divide-y divide-[#00000010]">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5">
                        <p className="font-bebas font-medium text-sm leading-5 uppercase tracking-wider text-[#4A5875]">{row.label}</p>
                        <p className="font-bebas font-medium text-sm leading-5 text-[#0B1120] sm:text-sm">{row.value}</p>
                    </div>
                ))}
            </div>

            {run.warning && (
                <div className="mt-4 rounded-lg border border-[#C79417] bg-[#FBF3DD] p-3">
                    <p className="font-bebas text-xs text-[#8A6710]">{run.warning}</p>
                </div>
            )}
        </div>
    )
}

function deficiencyRateStyle(rate: number) {
    return rate < 10
        ? "border-[#86EFAC] bg-[#DCFCE7] text-[#15803D]"
        : "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]"
}

function VendorTable({ vendors }: { vendors: VendorStat[] }) {
    const columns = [
        "Vendor",
        "Correct Installs",
        "Deficiencies",
        "Deficiency Rate",
        "First-Pass",
        "Rejected",
        "Rework Cycles",
        "Avg Correction",
        "Avg Awaiting Proof",
    ]

    return (
        <div className="mt-6 rounded-2xl border border-[#00000014] bg-white shadow-sm">
            <h2 className="border-b border-[#00000010] p-4 font-bebas font-medium text-sm leading-5 uppercase tracking-wider text-[#111A2B] sm:p-6">
                Vendor List
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-225 border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#00000010]">
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className="whitespace-nowrap px-4 py-3 font-bebas text-xs font-medium uppercase tracking-wider text-[#00000066]"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor) => (
                            <tr key={vendor.id} className="border-b border-[#00000010] last:border-0">
                                <td className="px-4 py-4">
                                    <p className="font-bebas font-medium text-sm leading-5 text-[#0B1120]">{vendor.name}</p>
                                    <p className="font-bebas font-medium text-xs leading-4 uppercase tracking-wider text-[#4A5875]">
                                        {vendor.trade}
                                    </p>
                                </td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.correctInstalls}</td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.deficiencies}</td>
                                <td className="px-4 py-4">
                                    <span
                                        className={`rounded border px-2 py-0.5 font-bebas text-xs ${deficiencyRateStyle(
                                            vendor.deficiencyRate
                                        )}`}
                                    >
                                        {vendor.deficiencyRate}
                                    </span>
                                </td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.firstPassPct}%</td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.rejected}</td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.reworkCycles}</td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">{vendor.avgCorrectionDays} days</td>
                                <td className="px-4 py-4 font-bebas text-sm text-[#111111]">
                                    {vendor.avgAwaitingProofDays} days
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default function Connection() {
    const [source, setSource] = useState<SyncSourceId>("mock")
    const [mockDataset, setMockDataset] = useState("")
    const [syncInterval, setSyncInterval] = useState("")
    const [autoSync, setAutoSync] = useState(true)
    const [matchByAddress, setMatchByAddress] = useState(true)
    const [createProofJobs, setCreateProofJobs] = useState(false)

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                    <h2 className="mb-4 font-bebas text-sm font-medium leading-5 uppercase tracking-wider text-[#111A2B]">
                        Synchronization Source
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {SYNC_SOURCES.map((option) => {
                            const isSelected = option.id === source
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setSource(option.id)}
                                    className={`relative rounded-xl border p-4 text-left transition-colors ${
                                        isSelected
                                            ? "border-[#C79417] bg-[#FBF3DD]"
                                            : "border-[#00000022] bg-white hover:bg-[#00000006]"
                                    }`}
                                >
                                    {isSelected && (
                                        <Check className="absolute right-3 top-3 h-6 w-6 text-[#C79417]" />
                                    )}
                                    <SourceIcon id={option.id} />
                                    <p className="mt-3 font-bebas text-xs font-medium uppercase leading-4 tracking-wider text-[#0B1120]">
                                        {option.label}
                                    </p>
                                    <p className="mt-1 font-bebas text-xs leading-5 text-[#4A5875]">{option.description}</p>
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-bebas font-medium uppercase tracking-wider text-[#4A5875] text-xs">
                                Mock Dataset
                            </label>
                            <input
                                type="text"
                                value={mockDataset}
                                onChange={(e) => setMockDataset(e.target.value)}
                                className={inputClasses}
                            />
                            <p className="mt-1.5 font-bebas text-xs font-medium leading-4 text-[#7C88A3]">Used for training and demos.</p>
                        </div>
                        <div>
                            <label className="mb-2 block font-bebas font-medium uppercase tracking-wider text-[#4A5875] text-xs">
                                Sync Interval
                            </label>
                            <input
                                type="text"
                                value={syncInterval}
                                onChange={(e) => setSyncInterval(e.target.value)}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="mt-2 divide-y divide-[#00000010] border-t border-[#00000010]">
                        <SettingRow
                            title="Automatic Synchronization"
                            description="Pull job, client, and assignment changes on the configured interval."
                            checked={autoSync}
                            onChange={setAutoSync}
                        />
                        <SettingRow
                            title="Match Jobs by Normalized Address"
                            description="Falls back to job number when the address is ambiguous."
                            checked={matchByAddress}
                            onChange={setMatchByAddress}
                        />
                        <SettingRow
                            title="Create Proof Jobs for Unmatched Jobtread Jobs"
                            description="When off, unmatched jobs are queued as job-matching issues."
                            checked={createProofJobs}
                            onChange={setCreateProofJobs}
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className="rounded-md bg-[#C9971A] px-5 py-2.5 font-bebas text-sm font-semibold uppercase tracking-wider text-[#0B1120] hover:opacity-90"
                        >
                            Save Configuration
                        </button>
                    </div>
                </div>

                <LastRunPanel run={MOCK_LAST_RUN} />
            </div>

            <VendorTable vendors={MOCK_VENDORS} />
        </div>
    )
}