export type Phase = "Foundation" | "Framing" | "Roughin" | "Final"

export type InstallationQuality = "" | "Pass" | "Deficiency" | "Not Applicable"

export interface ChecklistItemTemplate {
    id: string
    label: string
}

export interface InspectionItemState {
    id: string
    label: string
    dateInspected: string
    quality: InstallationQuality
    vendor: string
    deficiencyDescription: string
    photoName: string | null
}

export interface StartInspectionFormValues {
    jobAddress: string
    clientName: string
    inspector: string
    phase: Phase | ""
}

export interface InspectionRecord {
    code: string
    jobAddress: string
    clientName: string
    inspector: string
    date: string
    phase: Phase
    items: InspectionItemState[]
    locked: boolean
}