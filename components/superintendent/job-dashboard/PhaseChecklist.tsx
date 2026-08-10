"use client"

import { useState } from "react"
import { ChevronDown, Plus, Lock, Save, X } from "lucide-react"
import { Job, ChecklistItemState, ChecklistItemQuality, AdditionalChecklistItem } from "@/types/job-types"
import { PHASE_CHECKLIST_LABELS, PhaseTemplate, VENDOR_OPTIONS } from "@/types/mock-jobs/mock-data"

interface PhaseChecklistProps {
    job: Job
    phase: PhaseTemplate
    onSubmitAndLock: (items: ChecklistItemState[], additionalItems: AdditionalChecklistItem[]) => void
    onSaveDraft: (items: ChecklistItemState[], additionalItems: AdditionalChecklistItem[]) => void
}

const inputClasses =
    "font-bebas w-full rounded-md border border-[#00000022] bg-white px-3 py-2 text-xs text-[#616161] leading-[120%] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33]"

function today() {
    return new Date().toISOString().slice(0, 10)
}

function buildInitialItems(phase: PhaseTemplate): ChecklistItemState[] {
    return PHASE_CHECKLIST_LABELS[phase].map((label, index) => ({
        id: `${phase}-${index}`,
        label,
        dateInspected: today(),
        quality: "",
        vendor: "Unassigned",
        notes: "",
        location: "",
        photoName: null,
        expanded: false,
    }))
}

function SelectField({
    value,
    onChange,
    options,
}: {
    value: string
    onChange: (v: string) => void
    options: string[]
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputClasses} appearance-none pr-9`}
            >
                {options.map((opt) => (
                    <option key={opt || "blank"} value={opt}>
                        {opt === "" ? "Select" : opt}
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
    )
}

export default function PhaseChecklist({ job, phase, onSubmitAndLock, onSaveDraft }: PhaseChecklistProps) {
    const [items, setItems] = useState<ChecklistItemState[]>(() => buildInitialItems(phase))
    const [additionalItems, setAdditionalItems] = useState<AdditionalChecklistItem[]>([])
    const [additionalDraft, setAdditionalDraft] = useState("")

    function updateItem(id: string, patch: Partial<ChecklistItemState>) {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
    }

    function addAdditionalItem() {
        const description = additionalDraft.trim()
        if (!description) return
        setAdditionalItems((prev) => [...prev, { id: `extra-${Date.now()}`, description }])
        setAdditionalDraft("")
    }

    function removeAdditionalItem(id: string) {
        setAdditionalItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="space-y-6">
            <h1 className="font-bebas text-2xl font-semibold uppercase tracking-wide text-[#111111]">{phase}</h1>

            <div className="rounded-2xl border border-[#C79417] bg-[#FBF3DD] p-4 shadow-sm sm:p-6">
                <h2 className="font-bebas text-base font-semibold tracking-wide text-[#111111]">{job.code}</h2>
                <p className="mt-1 font-bebas text-xs text-[#00000099] sm:text-sm">
                    {job.address} · {job.clientName} · Inspector {job.superintendentName.replace(" ", ".").toLowerCase()}
                </p>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#00000014] bg-white p-4 shadow-sm sm:p-6">
                        <h3 className="mb-4 font-bebas text-sm font-medium uppercase tracking-wide text-[#111111] sm:text-base">
                            {item.label}
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                    Date Inspected
                                </label>
                                <input
                                    type="date"
                                    value={item.dateInspected}
                                    onChange={(e) => updateItem(item.id, { dateInspected: e.target.value })}
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                    Installation Quality
                                </label>
                                <SelectField
                                    value={item.quality}
                                    onChange={(v) => updateItem(item.id, { quality: v as ChecklistItemQuality })}
                                    options={["", "Pass", "Deficiency", "Not Applicable"]}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                    Vendor / Assigned To
                                </label>
                                <SelectField
                                    value={item.vendor}
                                    onChange={(v) => updateItem(item.id, { vendor: v })}
                                    options={VENDOR_OPTIONS}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => updateItem(item.id, { expanded: !item.expanded })}
                            className="mt-3 flex items-center gap-1.5 font-bebas text-xs uppercase tracking-wider text-[#C79417] hover:opacity-80"
                        >
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${item.expanded ? "rotate-180" : ""}`} />
                            Notes, Location & Photos
                        </button>

                        {item.expanded && (
                            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[#00000010] pt-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={item.location}
                                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                                        placeholder="e.g. North wall, garage side"
                                        className={inputClasses}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                        Photos
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <label className="inline-flex cursor-pointer items-center rounded bg-[#111111] px-3 py-2 font-bebas text-xs uppercase tracking-wider text-white hover:opacity-90">
                                            Choose File
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    updateItem(item.id, { photoName: e.target.files?.[0]?.name ?? null })
                                                }
                                            />
                                        </label>
                                        <span className="font-bebas text-xs text-[#00000066]">
                                            {item.photoName ?? "No file chosen"}
                                        </span>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block font-bebas text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B] sm:text-xs">
                                        Notes
                                    </label>
                                    <textarea
                                        value={item.notes}
                                        onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                                        rows={3}
                                        placeholder="Anything the record should capture about this item"
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-[#00000014] bg-[#F5F1E8] p-4 shadow-sm sm:p-6">
                <h3 className="font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111]">Additional Items</h3>
                <p className="mt-1 font-bebas text-xs text-[#00000099] sm:text-sm">
                    Use this when something comes up during a Right-On inspection that is not in the phase checklist. These
                    items are included with the locked inspection and can be exported as Jobtread to-dos.
                </p>

                {additionalItems.length === 0 ? (
                    <p className="mt-3 font-bebas text-xs text-[#00000066]">No additional items added.</p>
                ) : (
                    <ul className="mt-3 space-y-2">
                        {additionalItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between gap-3 rounded-md border border-[#00000014] bg-white px-3 py-2"
                            >
                                <span className="font-bebas text-xs text-[#111111]">{item.description}</span>
                                <button type="button" onClick={() => removeAdditionalItem(item.id)}>
                                    <X className="h-3.5 w-3.5 text-[#00000066] hover:text-[#D64545]" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={additionalDraft}
                        onChange={(e) => setAdditionalDraft(e.target.value)}
                        placeholder="Describe the additional item"
                        className={`${inputClasses} sm:flex-1`}
                    />
                    <button
                        type="button"
                        onClick={addAdditionalItem}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-[#00000022] bg-white px-4 py-2 font-bebas text-xs uppercase tracking-wider text-[#111111] hover:bg-[#00000008]"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Additional Item
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={() => onSubmitAndLock(items, additionalItems)}
                    className="inline-flex items-center gap-2 rounded-md bg-[#D4A017] px-5 py-2.5 font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111] hover:opacity-90"
                >
                    <Lock className="h-4 w-4" />
                    Submit & Lock Inspection
                </button>
                <button
                    type="button"
                    onClick={() => onSaveDraft(items, additionalItems)}
                    className="inline-flex items-center gap-2 rounded-md border border-[#00000022] bg-white px-5 py-2.5 font-bebas text-sm uppercase tracking-wider text-[#111111] hover:bg-[#00000008]"
                >
                    <Save className="h-4 w-4" />
                    Save Draft
                </button>
            </div>
        </div>
    )
}