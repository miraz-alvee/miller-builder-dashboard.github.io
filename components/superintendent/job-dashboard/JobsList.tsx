"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Job, JobStatus } from "@/types/job-types"


interface JobsListProps {
    jobs: Job[]
    onSelectJob: (job: Job) => void
}

const STATUS_STYLES: Record<JobStatus, string> = {
    Active: "bg-[#DCFCE7] border-[#86EFAC] text-[#15803D]",
    "Punch List": "bg-[#FEF3C7] border-[#FCD34D] text-[#92400E]",
    "On Hold": "bg-[#E5E5E5] border-[#D4D4D4] text-[#525252]",
    Completed: "bg-[#DBEAFE] border-[#93C5FD] text-[#1D4ED8]",
}

function StatusBadge({ status }: { status: JobStatus }) {
    return (
        <span
            className={`rounded-full border px-2.5 py-0.5 font-bebas text-[10px] uppercase tracking-wider ${STATUS_STYLES[status]}`}
        >
            {status}
        </span>
    )
}

export default function JobsList({ jobs, onSelectJob }: JobsListProps) {
    const [query, setQuery] = useState("")

    const filtered = jobs.filter((job) => {
        const haystack = `${job.address} ${job.clientName} ${job.code}`.toLowerCase()
        return haystack.includes(query.toLowerCase())
    })

    return (
        <div className="space-y-6">
            <header>
                <h1 className="font-bebas text-xs font-medium uppercase tracking-wider text-[#00000099] sm:text-sm">
                    Jobs assigned or permitted to your account.
                </h1>
            </header>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by address, client, or job number"
                    className="w-full rounded-md border border-[#00000022] bg-white px-4 py-2.5 font-bebas text-xs uppercase tracking-wider text-[#111111] outline-none placeholder:text-[#00000066] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33] sm:text-sm"
                />
                <div className="hidden w-48 rounded-md border border-[#00000022] bg-white sm:block" />
            </div>

            <div className="space-y-4">
                {filtered.map((job) => {
                    const progressPct = job.itemsTotal === 0 ? 0 : Math.round((job.itemsComplete / job.itemsTotal) * 100)
                    return (
                        <button
                            key={job.id}
                            type="button"
                            onClick={() => onSelectJob(job)}
                            className="block w-full rounded-2xl border border-[#00000014] bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md sm:p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bebas text-base font-semibold tracking-wide text-[#111111]">
                                            {job.code}
                                        </h2>
                                        <StatusBadge status={job.status} />
                                    </div>
                                    <p className="mt-2 font-bebas text-sm font-medium text-[#111111]">{job.address}</p>
                                    <p className="mt-1 truncate font-bebas text-xs text-[#00000099] sm:text-sm">
                                        {job.clientName} · {job.jobtreadNumber} · {job.superintendentInitials} —{" "}
                                        {job.superintendentName}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">
                                            Right-On
                                        </p>
                                        <p className="font-bebas text-lg font-semibold text-[#C79417]">{job.rightOnScore}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-[#00000044]" />
                                </div>
                            </div>

                            <div className="mt-4 h-1.5 w-full rounded-full bg-[#00000014]">
                                <div
                                    className="h-1.5 rounded-full bg-[#D4A017]"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                            <p className="mt-2 font-bebas text-[10px] uppercase tracking-wider text-[#00000066]">
                                {job.itemsComplete} of {job.itemsTotal} inspection items complete
                            </p>
                        </button>
                    )
                })}

                {filtered.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-[#00000022] bg-white p-8 text-center font-bebas text-sm uppercase tracking-wider text-[#00000066]">
                        No jobs match that search.
                    </p>
                )}
            </div>
        </div>
    )
}