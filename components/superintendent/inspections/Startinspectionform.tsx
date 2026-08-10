"use client"

import { useState } from "react"

import { ChecklistItemTemplate, Phase, StartInspectionFormValues } from "@/types/inspection-types"

export const PHASES: Phase[] = ["Foundation", "Framing", "Roughin", "Final"]

export const PHASE_CHECKLISTS: Record<Phase, ChecklistItemTemplate[]> = {
    Foundation: [
        { id: "fnd-1", label: "Footings/forms verified before pour" },
        { id: "fnd-2", label: "Anchor bolts/hold downs placed correctly" },
        { id: "fnd-3", label: "Vapor barrier and slab prep documented" },
        { id: "fnd-4", label: "Foundation penetrations sleeved/sealed" },
    ],
    Framing: [
        { id: "frm-1", label: "Wall framing plumb and per plan" },
        { id: "frm-2", label: "Roof framing and sheathing complete" },
        { id: "frm-3", label: "Shear panels nailed per schedule" },
        { id: "frm-4", label: "Window/door rough openings sized correctly" },
    ],
    "Roughin": [
        { id: "rgh-1", label: "Plumbing rough-in pressure tested" },
        { id: "rgh-2", label: "Electrical rough-in per code" },
        { id: "rgh-3", label: "HVAC ductwork sealed and supported" },
        { id: "rgh-4", label: "Fire blocking installed" },
    ],
    Final: [
        { id: "fin-1", label: "Final grading and drainage verified" },
        { id: "fin-2", label: "All punch list items closed" },
        { id: "fin-3", label: "Life safety systems tested" },
        { id: "fin-4", label: "Certificate of occupancy documentation complete" },
    ],
}

export const PHASE_CODES: Record<Phase, string> = {
    Foundation: "FOUNDATI",
    Framing: "FRAMING",
    Roughin: "ROUGHIN",
    Final: "FINAL",
}



interface StartInspectionFormProps {
    onStart: (values: StartInspectionFormValues) => void
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-2 block font-bebas text-xs font-medium uppercase leading-[130%] tracking-wider text-[#00000099] sm:text-sm">
            {children}
        </label>
    )
}

const inputClasses =
    "font-bebas w-full rounded-md border border-[#00000022] bg-white px-3 py-2.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B33]"

export default function StartInspectionForm({ onStart }: StartInspectionFormProps) {
    const [values, setValues] = useState<StartInspectionFormValues>({
        jobAddress: "",
        clientName: "",
        inspector: "",
        phase: "",
    })

    const canStart = values.jobAddress.trim() !== "" && values.phase !== ""

    function update<K extends keyof StartInspectionFormValues>(key: K, value: StartInspectionFormValues[K]) {
        setValues((prev) => ({ ...prev, [key]: value }))
    }

    function handleStart() {
        if (!canStart) return
        onStart(values)
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="font-bebas text-xs font-medium uppercase tracking-wider text-[#00000099] sm:text-sm">
                    Start a new right-on inspection. Pick the phase to preload its checklist items.
                </h1>
            </header>

            <div className="rounded-2xl border border-[#DED8CE] bg-white p-4 shadow-sm sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <FieldLabel>Job Address</FieldLabel>
                        <input
                            type="text"
                            value={values.jobAddress}
                            onChange={(e) => update("jobAddress", e.target.value)}
                            className={inputClasses}
                            placeholder="7201 Wesley Ave"
                        />
                    </div>

                    <div>
                        <FieldLabel>Client / Project Name</FieldLabel>
                        <input
                            type="text"
                            value={values.clientName}
                            onChange={(e) => update("clientName", e.target.value)}
                            className={inputClasses}
                            placeholder="Miller Residence"
                        />
                    </div>

                    <div>
                        <FieldLabel>Inspector</FieldLabel>
                        <input
                            type="text"
                            value={values.inspector}
                            onChange={(e) => update("inspector", e.target.value)}
                            className={inputClasses}
                            placeholder="JM"
                        />
                    </div>

                    <div>
                        <FieldLabel>Phase</FieldLabel>
                        <div className="relative">
                            <select
                                value={values.phase}
                                onChange={(e) => update("phase", e.target.value as Phase)}
                                className={`${inputClasses} appearance-none pr-9`}
                            >
                                <option value="" disabled>
                                    Select phase
                                </option>
                                {PHASES.map((phase) => (
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
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleStart}
                    disabled={!canStart}
                    className="cursor-pointer mt-6 inline-flex items-center gap-2 rounded-md bg-[#D4A017] px-5 py-2.5 font-bebas text-sm font-semibold uppercase tracking-wider text-[#111111] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                        <path d="M4 2.5L13 8L4 13.5V2.5Z" />
                    </svg>
                    Start Inspection
                </button>
            </div>
        </div>
    )
}