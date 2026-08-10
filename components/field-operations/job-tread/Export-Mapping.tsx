"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { ExportMappingField } from "@/data-types/jobtread-types"


interface ExportMappingProps {
    initialFields: ExportMappingField[]
    onSave: (fields: ExportMappingField[]) => void
}

const inputClasses =
    "font-bebas w-full rounded-md border border-[#00000022] bg-[#F7F4EF] px-3 py-2.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33] focus:bg-white"

export default function ExportMapping({ initialFields, onSave }: ExportMappingProps) {
    const [fields, setFields] = useState<ExportMappingField[]>(initialFields)

    function updateField(id: string, patch: Partial<ExportMappingField>) {
        setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)))
    }

    return (
        <div className="rounded-2xl border border-[#00000014] bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#00000010] p-4 sm:p-6">
                <div>
                    <h2 className="font-bebas font-medium text-sm leading-5 uppercase tracking-wider text-[#111A2B]">
                        Jobtread To-Do Export Mappings
                    </h2>
                    <p className="mt-1 font-bebas font-medium text-xs leading-4 text-[#4A5875]">
                        Fields written when deficiencies are pushed as to-dos
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => onSave(fields)}
                    className="shrink-0 rounded-md bg-[#D4A017] px-5 py-2.5 font-bebas text-sm font-medium uppercase tracking-wider text-[#111A2B] hover:opacity-90"
                >
                    Save Mapping
                </button>
            </div>

            <div className="space-y-3 p-4 sm:p-6">
                {fields.map((field) => (
                    <div key={field.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <input
                            type="text"
                            value={field.sourceLabel}
                            onChange={(e) => updateField(field.id, { sourceLabel: e.target.value })}
                            className={inputClasses}
                        />
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#00000044]" />
                        <input
                            type="text"
                            value={field.targetLabel}
                            onChange={(e) => updateField(field.id, { targetLabel: e.target.value })}
                            className={inputClasses}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
