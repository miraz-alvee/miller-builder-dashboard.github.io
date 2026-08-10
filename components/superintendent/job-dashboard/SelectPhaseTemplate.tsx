"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Job } from "@/types/job-types"
import { PHASE_TEMPLATES, PhaseTemplate } from "@/types/mock-jobs/mock-data"

interface SelectPhaseTemplateProps {
    job: Job
    onLoadChecklist: (phase: PhaseTemplate) => void
}

export default function SelectPhaseTemplate({ job, onLoadChecklist }: SelectPhaseTemplateProps) {
    const [template, setTemplate] = useState<PhaseTemplate | "">("")

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-[#C79417] bg-[#FBF3DD] p-4 shadow-sm sm:p-6">
                <h1 className="font-bebas text-base font-semibold tracking-wide text-[#111111]">{job.code}</h1>
                <p className="mt-1 font-bebas text-xs text-[#00000099] sm:text-sm">
                    {job.address} · {job.clientName} · Inspector {job.superintendentName.replace(" ", ".").toLowerCase()}
                </p>
            </div>

            <div className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#C79417]" />
                    <h2 className="font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111]">
                        Select Phase / Template
                    </h2>
                </div>
                <p className="mb-4 font-bebas text-xs text-[#00000099] sm:text-sm">
                    Choose a construction phase or inspection template to load its preconfigured checklist items.
                </p>

                <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                    Template
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <select
                            value={template}
                            onChange={(e) => setTemplate(e.target.value as PhaseTemplate)}
                            className="font-bebas w-full appearance-none rounded-md border border-[#00000022] bg-white px-3 py-2.5 pr-9 text-sm text-[#111111] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33]"
                        >
                            <option value="" disabled>
                                Select a template
                            </option>
                            {PHASE_TEMPLATES.map((phase) => (
                                <option key={phase} value={phase}>
                                    {phase}
                                </option>
                            ))}
                        </select>
                        <svg
                            className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-[#00000066]"
                            viewBox="0 0 12 8"
                            fill="none"
                        >
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>

                    <button
                        type="button"
                        disabled={!template}
                        onClick={() => template && onLoadChecklist(template)}
                        className="rounded-md bg-[#D4A017] px-5 py-2.5 font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Load Checklist
                    </button>
                </div>
            </div>
        </div>
    )
}