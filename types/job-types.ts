export type JobStatus = "Active" | "Punch List" | "On Hold" | "Completed"

export interface PhaseProgress {
    phase: string
    completed: number
    total: number
}

export interface LockedInspectionSummary {
    phase: string
    subtitle: string
    lockedDate: string
    inspector: string
}

export interface Job {
    id: string
    code: string
    status: JobStatus
    address: string
    clientName: string
    jobtreadNumber: string
    superintendentInitials: string
    superintendentName: string
    rightOnScore: number
    itemsComplete: number
    itemsTotal: number
    openCount: number
    overdueCount: number
    readyForReviewCount: number
    phaseProgress: PhaseProgress[]
    recentLockedInspections: LockedInspectionSummary[]
}

export type ChecklistItemQuality = "" | "Pass" | "Deficiency" | "Not Applicable"

export interface ChecklistItemState {
    id: string
    label: string
    dateInspected: string
    quality: ChecklistItemQuality
    vendor: string
    notes: string
    location: string
    photoName: string | null
    expanded: boolean
}

export interface AdditionalChecklistItem {
    id: string
    description: string
}