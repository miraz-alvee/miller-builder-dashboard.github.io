"use client"

import { SyncErrorItem } from "@/data-types/jobtread-types"
import { AlertCircle, AlertTriangle } from "lucide-react"


interface SyncErrorsProps {
    errors: SyncErrorItem[]
    onResolve: (id: string) => void
}

function SeverityIcon({ severity }: { severity: SyncErrorItem["severity"] }) {
    if (severity === "error") return <AlertCircle className="h-4 w-4 shrink-0 text-[#D64545]" />
    return <AlertTriangle className="h-4 w-4 shrink-0 text-[#C79417]" />
}

export default function SyncErrors({ errors, onResolve }: SyncErrorsProps) {
    const unresolvedCount = errors.filter((e) => !e.resolved).length

    return (
        <div className="rounded-2xl border border-[#00000014] bg-white shadow-sm">
            <div className="border-b border-[#00000010] p-4 sm:p-6">
                <h2 className="font-bebas font-medium text-sm leading-5 uppercase tracking-wider text-[#111A2B]">
                    Synchronization Errors and Job-Matching Issues
                </h2>
                <p className="mt-1 font-bebas font-medium text-xs leading-4 text-[#4A5875]">{unresolvedCount} unresolved</p>
            </div>

            <div className="divide-y divide-[#00000010]">
                {errors.map((error) => (
                    <div key={error.id} className="flex items-start justify-between gap-4 p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                            <SeverityIcon severity={error.severity} />
                            <div>
                                <p className="font-bebas font-medium text-sm leading-5 text-[#111A2B] sm:text-base">
                                    {error.message}
                                </p>
                                <p className="mt-1 font-bebas font-medium text-xs leading-4 uppercase tracking-wider text-[#00000066]">
                                    {error.timestamp} · {error.category} · {error.reference}
                                </p>
                            </div>
                        </div>

                        {error.resolved ? (
                            <span className="shrink-0 rounded-full border border-[#86EFAC] bg-[#DCFCE7] px-3 py-1 font-bebas text-[10px] uppercase tracking-wider text-[#15803D]">
                                Resolved
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => onResolve(error.id)}
                                className="shrink-0 rounded-md border border-[#00000022] bg-white px-3 py-1.5 font-bebas text-[10px] uppercase tracking-wider text-[#111111] hover:bg-[#00000008]"
                            >
                                Resolve
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}