"use client"

import { useState } from "react"

type Criticality = "Critical" | "Quality" | "Finish Readiness"
type DeficiencyState = "Ready for Review" | "Open" | "Closed" | "Info Requested" | "Rework Requested"

interface Deficiency {
    id: string
    code: string
    address: string
    title: string
    vendor: string
    phase: string
    criticality: Criticality
    dueDate: string
    overdue: boolean
    rework: number
    state: DeficiencyState
}

const DEFICIENCIES: Deficiency[] = [
    {
        id: "def-4411",
        code: "DEF-4411",
        address: "218 Cedar Ridge Ln",
        title: 'WRB laps shingled a minimum of 6" horizontally',
        vendor: "Ironline Exteriors",
        phase: "Weather Barrier",
        criticality: "Critical",
        dueDate: "2026-07-30",
        overdue: false,
        rework: 1,
        state: "Ready for Review",
    },
    {
        id: "def-4408",
        code: "DEF-4408",
        address: "4402 Marlow St",
        title: "Hydroblok pan seams banded and sealed",
        vendor: "Coastal Waterproofing",
        phase: "Waterproofing",
        criticality: "Critical",
        dueDate: "2026-07-25",
        overdue: true,
        rework: 0,
        state: "Open",
    },
    {
        id: "def-4399",
        code: "DEF-4399",
        address: "312 Wexler Court",
        title: "Seam tape fully rolled with no fish-mouths",
        vendor: "Ironline Exteriors",
        phase: "Weather Barrier",
        criticality: "Quality",
        dueDate: "2026-07-18",
        overdue: false,
        rework: 0,
        state: "Closed",
    },
    {
        id: "def-4415",
        code: "DEF-4415",
        address: "4402 Marlow St",
        title: "Sill pan flashing installed with back dam",
        vendor: "Summit Window & Door",
        phase: "Waterproofing",
        criticality: "Critical",
        dueDate: "2026-08-01",
        overdue: false,
        rework: 0,
        state: "Info Requested",
    },
    {
        id: "def-4390",
        code: "DEF-4390",
        address: "218 Cedar Ridge Ln",
        title: "Hangers fully nailed per schedule",
        vendor: "Barrett Framing Co.",
        phase: "Framing",
        criticality: "Finish Readiness",
        dueDate: "2026-07-26",
        overdue: true,
        rework: 2,
        state: "Rework Requested",
    },
]

type TabId = "all" | "ready" | "open" | "overdue" | "rework" | "closed"

const TABS: { id: TabId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "ready", label: "Ready for Review" },
    { id: "open", label: "Open" },
    { id: "overdue", label: "Overdue" },
    { id: "rework", label: "Rework" },
    { id: "closed", label: "Closed" },
]

const CRITICALITY_STYLES: Record<Criticality, string> = {
    Critical: "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]",
    Quality: "border-[#FCD34D] bg-[#FEF3C7] text-[#92400E]",
    "Finish Readiness": "border-[#93C5FD] bg-[#DBEAFE] text-[#1D4ED8]",
}

const STATE_STYLES: Record<DeficiencyState, string> = {
    "Ready for Review": "border-[#93C5FD] bg-[#DBEAFE] text-[#1D4ED8]",
    Open: "border-[#FCD34D] bg-[#FEF3C7] text-[#92400E]",
    Closed: "border-[#86EFAC] bg-[#DCFCE7] text-[#15803D]",
    "Info Requested": "border-[#C4B5FD] bg-[#EDE9FE] text-[#6D28D9]",
    "Rework Requested": "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]",
}

function Badge({ label, className }: { label: string; className: string }) {
    return (
        <span className={`inline-block rounded border px-2.5 py-1 font-bebas text-[10px] uppercase tracking-wider ${className}`}>
            {label}
        </span>
    )
}

function StatCard({ label, value, valueClassName }: { label: string; value: number; valueClassName: string }) {
    return (
        <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-5">
            <p className="font-bebas text-xs uppercase tracking-wider text-[#00000066]">{label}</p>
            <p className={`mt-1 font-bebas text-2xl font-semibold ${valueClassName}`}>{value}</p>
        </div>
    )
}

function matchesTab(deficiency: Deficiency, tab: TabId): boolean {
    if (tab === "all") return true
    if (tab === "ready") return deficiency.state === "Ready for Review"
    if (tab === "open") return deficiency.state === "Open"
    if (tab === "overdue") return deficiency.overdue
    if (tab === "rework") return deficiency.rework > 0
    if (tab === "closed") return deficiency.state === "Closed"
    return true
}

export default function DeficiencyOversightPage() {
    const [tab, setTab] = useState<TabId>("all")
    const [query, setQuery] = useState("")

    const openCount = DEFICIENCIES.filter((d) => d.state === "Open").length
    const overdueCount = DEFICIENCIES.filter((d) => d.overdue).length
    const readyCount = DEFICIENCIES.filter((d) => d.state === "Ready for Review").length
    const closedCount = DEFICIENCIES.filter((d) => d.state === "Closed").length

    const filtered = DEFICIENCIES.filter((d) => {
        if (!matchesTab(d, tab)) return false
        const haystack = `${d.title} ${d.code} ${d.address} ${d.vendor} ${d.phase}`.toLowerCase()
        return haystack.includes(query.toLowerCase())
    })

    return (
        <div className="min-h-screen bg-[#F7F4EF] text-[#111111] ">
            <div className=" space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard label="Open" value={openCount} valueClassName="text-[#B8860B]" />
                    <StatCard label="Overdue" value={overdueCount} valueClassName="text-[#D64545]" />
                    <StatCard label="Ready for Review" value={readyCount} valueClassName="text-[#111111]" />
                    <StatCard label="Closed" value={closedCount} valueClassName="text-[#15803D]" />
                </div>

                <div className="flex items-center gap-6 overflow-x-auto border-b border-[#00000014]">
                    {TABS.map((t) => {
                        const isActive = t.id === tab
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`relative shrink-0 whitespace-nowrap pb-3 font-bebas text-xs uppercase tracking-wider transition-colors sm:text-sm ${
                                    isActive ? "text-[#111111]" : "text-[#00000066] hover:text-[#111111]"
                                }`}
                            >
                                {t.label}
                                {isActive && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-[#D4A017]" />}
                            </button>
                        )
                    })}
                </div>

                <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search deficiencies"
                            className="w-full flex-1 rounded-md border border-[#00000022] bg-white px-4 py-2.5 font-bebas text-xs uppercase tracking-wider text-[#111111] outline-none placeholder:text-[#00000066] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33] sm:text-sm"
                        />
                        <div className="h-11 w-full rounded-md border border-[#00000022] bg-white sm:w-48" />
                        <div className="h-11 w-full rounded-md border border-[#00000022] bg-white sm:w-48" />
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#00000014] bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-240 border-collapse text-left">
                            <thead>
                                <tr className="border-b border-[#00000010]">
                                    {["Deficiency", "Vendor", "Phase", "Criticality", "Due", "Rework", "State", ""].map(
                                        (col) => (
                                            <th
                                                key={col}
                                                className="whitespace-nowrap px-6 py-3 font-bebas text-[10px] font-medium uppercase tracking-wider text-[#00000066]"
                                            >
                                                {col}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((d) => (
                                    <tr key={d.id} className="border-b border-[#00000010] last:border-0">
                                        <td className="px-6 py-4">
                                            <p className="font-bebas font-medium text-sm leading-5 uppercase text-[#0B1120]">
                                                {d.title}
                                            </p>
                                            <p className="mt-1 font-bebas font-medium text-xs leading-4 uppercase tracking-wider text-[#4A5875]">
                                                {d.code} · {d.address}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 font-bebas text-sm text-[#111111]">{d.vendor}</td>
                                        <td className="px-6 py-4 font-bebas text-sm text-[#111111]">{d.phase}</td>
                                        <td className="px-6 py-4">
                                            <Badge label={d.criticality} className={CRITICALITY_STYLES[d.criticality]} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className={`font-bebas text-sm ${d.overdue ? "text-[#D64545]" : "text-[#111111]"}`}>
                                                {d.dueDate}
                                                {d.overdue && " · Overdue"}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 font-bebas text-sm text-[#111111]">{d.rework}</td>
                                        <td className="px-6 py-4">
                                            <Badge label={d.state} className={STATE_STYLES[d.state]} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                className="font-bebas text-xs uppercase tracking-wider text-[#111111] hover:text-[#C79417]"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-10 text-center">
                                            <p className="font-bebas text-sm uppercase tracking-wider text-[#00000066]">
                                                No deficiencies match this view.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}