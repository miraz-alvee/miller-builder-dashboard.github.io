"use client"

import Connection from "@/components/field-operations/job-tread/Connection";
import ExportMapping from "@/components/field-operations/job-tread/Export-Mapping";
import SyncErrors from "@/components/field-operations/job-tread/SyncErrors";
import { ExportMappingField, SyncErrorItem } from "@/data-types/jobtread-types";
import { MOCK_EXPORT_MAPPING, MOCK_SYNC_ERRORS } from "@/mock_data/jobtread-data";
import { useState } from "react"


type JobTreadTab = "connection" | "sync-errors" | "export-mapping"

const TABS: { id: JobTreadTab; label: string }[] = [
    { id: "connection", label: "Connection" },
    { id: "sync-errors", label: "Sync Errors" },
    { id: "export-mapping", label: "To-Do Export Mapping" },
]

export default function JobTreadPage() {
    const [tab, setTab] = useState<JobTreadTab>("connection")
    const [errors, setErrors] = useState<SyncErrorItem[]>(MOCK_SYNC_ERRORS)

    const unresolvedErrorCount = errors.filter((e) => !e.resolved).length

    function handleResolve(id: string) {
        setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, resolved: true } : e)))
    }

    function handleSaveMapping(fields: ExportMappingField[]) {
        // TODO: persist the mapping fields
    }

    return (
        <div className="min-h-screen">
            <div className=" space-y-6">
                <div className="flex items-center gap-6 border-b border-[#00000014]">
                    {TABS.map((t) => {
                        const isActive = t.id === tab
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`relative flex items-center gap-2 pb-3 font-bebas text-xs uppercase tracking-wider transition-colors sm:text-sm ${
                                    isActive ? "text-[#111111]" : "text-[#00000066] hover:text-[#111111]"
                                }`}
                            >
                                {t.label}
                                {t.id === "sync-errors" && unresolvedErrorCount > 0 && (
                                    <span className="rounded-full bg-[#00000014] px-1.5 py-0.5 font-bebas text-[10px] text-[#111111]">
                                        {unresolvedErrorCount}
                                    </span>
                                )}
                                {isActive && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-[#D4A017]" />}
                            </button>
                        )
                    })}
                </div>

                {tab === "connection" && <Connection />}
                {tab === "sync-errors" && <SyncErrors errors={errors} onResolve={handleResolve} />}
                {tab === "export-mapping" && (
                    <ExportMapping initialFields={MOCK_EXPORT_MAPPING} onSave={handleSaveMapping} />
                )}
            </div>
        </div>
    )
}