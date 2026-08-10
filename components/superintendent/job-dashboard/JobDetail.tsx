"use client"

import { QrCode, ExternalLink, Plus, Lock } from "lucide-react"
import { Job, JobStatus } from "@/types/job-types"

interface JobDetailProps {
    job: Job
    onBack: () => void
    onStartInspection: () => void
    onViewLockedInspection: (phase: string) => void
    onViewHistory: () => void
}

const STATUS_STYLES: Record<JobStatus, string> = {
    Active: "bg-[#DCFCE7] border-[#86EFAC] text-[#15803D]",
    "Punch List": "bg-[#FEF3C7] border-[#FCD34D] text-[#92400E]",
    "On Hold": "bg-[#E5E5E5] border-[#D4D4D4] text-[#525252]",
    Completed: "bg-[#DBEAFE] border-[#93C5FD] text-[#1D4ED8]",
}

function StatCard({ value, label, tone }: { value: number; label: string; tone?: "danger" | "info" }) {
    const valueColor = tone === "danger" ? "text-[#D64545]" : tone === "info" ? "text-[#1D4ED8]" : "text-[#111111]"
    return (
        <div className="rounded-2xl border border-[#00000014] bg-white p-5 shadow-sm">
            <p className={`font-bebas text-2xl font-semibold ${valueColor}`}>{value}</p>
            <p className="mt-1 font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">{label}</p>
        </div>
    )
}

export default function JobDetail({ job, onBack, onStartInspection, onViewLockedInspection, onViewHistory }: JobDetailProps) {
    return (
        <div className="space-y-6">
            <nav className="font-bebas text-xs uppercase tracking-wider text-[#00000066]">
                <button type="button" onClick={onBack} className="hover:text-[#111111]">
                    Jobs
                </button>{" "}
                / <span className="text-[#111111]">{job.code}</span>
            </nav>

            <div className="rounded-2xl border border-[#C79417] bg-[#FBF3DD] p-4 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-bebas text-xl font-semibold tracking-wide text-[#111111]">{job.code}</h1>
                            <span
                                className={`rounded-full border px-2.5 py-0.5 font-bebas text-[10px] uppercase tracking-wider ${STATUS_STYLES[job.status]}`}
                            >
                                {job.status}
                            </span>
                        </div>
                        <p className="mt-1 font-bebas text-sm text-[#111111]">{job.address}</p>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Right-On Score</p>
                        <p className="font-bebas text-3xl font-semibold text-[#111111]">{job.rightOnScore}</p>
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Out of 100</p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Address</p>
                        <p className="font-bebas text-sm text-[#111111]">{job.address}</p>
                    </div>
                    <div>
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Client</p>
                        <p className="font-bebas text-sm text-[#111111]">{job.clientName}</p>
                    </div>
                    <div>
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Jobtread #</p>
                        <p className="font-bebas text-sm text-[#111111]">{job.jobtreadNumber}</p>
                    </div>
                    <div>
                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">Superintendent</p>
                        <p className="font-bebas text-sm text-[#111111]">
                            {job.superintendentInitials} — {job.superintendentName}
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onStartInspection}
                        className="inline-flex items-center gap-2 rounded-md bg-[#D4A017] px-4 py-2.5 font-bebas text-xs font-semibold uppercase tracking-wider text-[#111111] hover:opacity-90 sm:text-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Start Right-On Inspection
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border border-[#00000022] bg-white px-4 py-2.5 font-bebas text-xs uppercase tracking-wider text-[#111111] hover:bg-[#00000008] sm:text-sm"
                    >
                        <QrCode className="h-4 w-4" />
                        Internal QR
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border border-[#00000022] bg-white px-4 py-2.5 font-bebas text-xs uppercase tracking-wider text-[#111111] hover:bg-[#00000008] sm:text-sm"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open in Jobtread
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard value={job.openCount} label="Open" />
                <StatCard value={job.overdueCount} label="Overdue" tone="danger" />
                <StatCard value={job.readyForReviewCount} label="Ready for Review" tone="info" />
            </div>

            <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-4 font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111]">
                    Inspection Phase Progress
                </h2>
                <div className="space-y-4">
                    {job.phaseProgress.map((phase) => {
                        const pct = phase.total === 0 ? 0 : Math.round((phase.completed / phase.total) * 100)
                        return (
                            <div key={phase.phase}>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <p className="font-bebas text-xs uppercase tracking-wider text-[#111111]">{phase.phase}</p>
                                    <p className="font-bebas text-xs text-[#00000066]">
                                        {phase.completed}/{phase.total}
                                    </p>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-[#00000014]">
                                    <div className="h-1.5 rounded-full bg-[#D4A017]" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111]">
                        Recent Locked Inspections
                    </h2>
                    <button
                        type="button"
                        onClick={onViewHistory}
                        className="font-bebas text-xs uppercase tracking-wider text-[#C79417] hover:underline"
                    >
                        View History
                    </button>
                </div>

                {job.recentLockedInspections.length === 0 ? (
                    <p className="font-bebas text-xs text-[#00000066]">No locked inspections yet.</p>
                ) : (
                    <div className="divide-y divide-[#00000010]">
                        {job.recentLockedInspections.map((entry) => (
                            <div key={entry.phase} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                <div className="flex items-start gap-2">
                                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00000066]" />
                                    <div>
                                        <p className="font-bebas text-xs uppercase tracking-wider text-[#111111]">{entry.phase}</p>
                                        <p className="font-bebas text-[11px] text-[#00000066]">
                                            {entry.subtitle} · Locked {entry.lockedDate} · Inspector {entry.inspector}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onViewLockedInspection(entry.phase)}
                                    className="shrink-0 font-bebas text-xs uppercase tracking-wider text-[#C79417] hover:underline"
                                >
                                    View →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}