export type SyncSourceId = "mock" | "csv" | "api"

export interface SyncSourceOption {
    id: SyncSourceId
    label: string
    description: string
}

export interface LastRunSummary {
    status: string
    started: string
    durationSeconds: number
    jobsCreated: number
    jobsUpdated: number
    unmatched: number
    warning: string | null
}

export interface VendorStat {
    id: string
    name: string
    trade: string
    correctInstalls: number
    deficiencies: number
    deficiencyRate: number
    firstPassPct: number
    rejected: number
    reworkCycles: number
    avgCorrectionDays: number
    avgAwaitingProofDays: number
}

export type SyncErrorSeverity = "error" | "warning"

export interface SyncErrorItem {
    id: string
    severity: SyncErrorSeverity
    message: string
    timestamp: string
    category: string
    reference: string
    resolved: boolean
}

export interface ExportMappingField {
    id: string
    sourceLabel: string
    sourceValue: string
    targetLabel: string
    targetValue: string
}