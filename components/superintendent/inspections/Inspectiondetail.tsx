"use client"

import { InspectionItemState, InspectionRecord, InstallationQuality } from "@/types/inspection-types"
import { FileText } from "lucide-react"
import Link from "next/link"

export const VENDOR_OPTIONS = [
    "Unassigned",
    "Miller Concrete Co.",
    "Wesley Framing Crew",
    "In-House Inspector",
]

interface InspectionDetailProps {
    record: InspectionRecord
    onUpdateItem: (itemId: string, patch: Partial<InspectionItemState>) => void
    onBack: () => void
}

const inputClasses =
    "font-bebas w-full rounded-md border border-[#00000022] bg-white px-3 py-2 text-xs text-[#616161] leading-[120%] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33] disabled:cursor-not-allowed disabled:bg-[#00000008]"

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-2 block font-bebas text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#6B6B6B]">
            {children}
        </label>
    )
}

function SelectField({
    value,
    onChange,
    options,
    disabled,
}: {
    value: string
    onChange: (v: string) => void
    options: string[]
    disabled?: boolean
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
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

export default function InspectionDetail({ record, onUpdateItem, onBack }: InspectionDetailProps) {
    const qualityOptions: InstallationQuality[] = ["", "Pass", "Deficiency", "Not Applicable"]

    return (
        <div>
            <div className="space-y-0 overflow-hidden rounded-2xl border border-[#00000014] bg-white shadow-sm">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                    <div>
                        <button
                            type="button"
                            onClick={onBack}
                            className="mb-2 font-bebas text-xs uppercase tracking-wider text-[#00000066] hover:text-[#111111]"
                        >
                            ← Back
                        </button>
                        <h2 className="font-bebas text-[15px] font-medium leading-7 tracking-wide text-[#141414] sm:text-lg">
                            {record.code}
                        </h2>
                        <p className="mt-1 font-bebas font-medium text-[10px] leading-5 text-xs text-[#00000099] sm:text-sm">
                            {record.jobAddress} · {record.clientName}
                        </p>
                        <p className="font-bebas font-medium text-[10px] leading-5 text-xs text-[#00000099] sm:text-sm">
                            Date: {record.date} · Inspector: {record.inspector || "—"}
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end">
                        <span className="rounded border border-[#00000022] bg-[#F7F4EF] px-2 py-1 font-bebas text-[10px] uppercase tracking-wider text-[#00000099] sm:text-xs">
                            Locked
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded border border-[#C79417] bg-[#FBF3DD] px-2.5 py-1 font-bebas text-[10px] uppercase tracking-wider text-[#8A6710] sm:text-xs">
                            <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
                                <path d="M3 5V3.5a3 3 0 116 0V5h.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-7A.5.5 0 012 10.5v-5a.5.5 0 01.5-.5H3zm1 0h4V3.5a2 2 0 10-4 0V5z" />
                            </svg>
                            Locked Inspection Record
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 py-5 px-4">
                <span className="rounded bg-[#141414] px-3 py-1.5 font-bebas text-xs uppercase tracking-wider text-white">
                    {record.phase}
                </span>
                <span className="font-bebas font-medium text-[10px] leading-4 text-xs text-[#00000066] sm:text-sm">{record.items.length} items</span>
            </div>

            <div className=" space-y-4 mt-2">
                {record.items.map((item) => {
                    const isDeficiency = item.quality === "Deficiency"
                    // console.log(item.id, JSON.stringify(item.quality), record.locked)
                    return (
                        <div
                            key={item.id}
                            className={
                                isDeficiency
                                    ? " border border-[#00000014] bg-white shadow-sm rounded-xl p-4 sm:p-6"
                                    : "border border-[#00000014] bg-white shadow-sm p-4 sm:p-6 rounded-xl"
                            }
                        >
                            <p className="mb-1 font-bebas text-[10px] font-medium leading-4 uppercase tracking-wider text-[#00000080] sm:text-sm">
                                Inspection Item
                            </p>
                            <h3 className="mb-4 font-bebas text-sm font-medium uppercase leading-6 tracking-wide text-[#111111] sm:text-base">
                                {item.label}
                            </h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <FieldLabel>Date Inspected</FieldLabel>
                                    <input
                                        type="date"
                                        value={item.dateInspected}
                                        onChange={(e) => onUpdateItem(item.id, { dateInspected: e.target.value })}
                                        disabled={record.locked}
                                        className={inputClasses}
                                    />
                                </div>

                                <div>
                                    <FieldLabel>Installation Quality</FieldLabel>
                                    <SelectField
                                        value={item.quality}
                                        onChange={(v) => onUpdateItem(item.id, { quality: v as InstallationQuality })}
                                        options={qualityOptions}
                                        disabled={record.locked}
                                    />
                                </div>

                                <div>
                                    <FieldLabel>Vendor / Assigned To</FieldLabel>
                                    <SelectField
                                        value={item.vendor}
                                        onChange={(v) => onUpdateItem(item.id, { vendor: v })}
                                        options={VENDOR_OPTIONS}
                                        disabled={record.locked}
                                    />
                                </div>
                            </div>

                            {isDeficiency && (
                                <div className="mt-5 space-y-4 border-t border-[#D6454533] pt-4">
                                    <div>
                                        <FieldLabel>Deficiency Description</FieldLabel>
                                        <textarea
                                            value={item.deficiencyDescription}
                                            onChange={(e) =>
                                                onUpdateItem(item.id, { deficiencyDescription: e.target.value })
                                            }
                                            disabled={record.locked}
                                            rows={3}
                                            className={`${inputClasses} resize-none`}
                                            placeholder="Describe what was found and what's needed to correct it"
                                        />
                                    </div>

                                    <div>

                                        <FieldLabel>Photos</FieldLabel>
                                        <div className="flex items-center gap-3">
                                            <label
                                                className={`inline-flex cursor-pointer items-center rounded bg-[#111111] px-3 py-2 font-bebas text-xs uppercase tracking-wider text-white ${record.locked ? "cursor-not-allowed opacity-40" : "hover:opacity-90"
                                                    }`}
                                            >
                                                Choose File
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    disabled={record.locked}
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        onUpdateItem(item.id, {
                                                            photoName: e.target.files?.[0]?.name ?? null,
                                                        })
                                                    }
                                                />
                                            </label>
                                            <span className="text-xs text-[#00000066]">
                                                {item.photoName ?? "No file chosen"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center gap-4 p-4">
                <Link href="/superintendent/inspection-history">
                    Back to Inspection History
                    <button className="font-bebas text-sm leading-5 px-5 py-2.5 bg-[#F5F1E8] hover:bg-[#E0D8C8] text-[#141414] font-medium border border-[#00000026] rounded-lg transition-colors duration-200 shadow-sm">
                        Back to Inspection History
                    </button>
                </Link>

                <button className="font-bebas text-sm leading-5 px-5 py-2.5 bg-[#141414] hover:bg-[#000000] text-white font-medium rounded-lg border border-[#00000026] transition-colors duration-200 shadow-sm flex items-center gap-2">
                    <FileText />
                    Export PDF
                </button>
            </div>

        </div>
    )
}