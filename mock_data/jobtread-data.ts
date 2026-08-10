import { ExportMappingField, LastRunSummary, SyncErrorItem, SyncSourceOption, VendorStat } from "@/data-types/jobtread-types"

export const SYNC_SOURCES: SyncSourceOption[] = [
    { id: "mock", label: "Mock Dataset", description: "Seeded demo jobs. No external calls." },
    { id: "csv", label: "CSV Import", description: "Scheduled upload of a Jobtread job export." },
    { id: "api", label: "Live API", description: "Authenticated Jobtread API polling." },
]

export const MOCK_LAST_RUN: LastRunSummary = {
    status: "Completed with warnings",
    started: "2026-07-28 06:00",
    durationSeconds: 14,
    jobsCreated: 0,
    jobsUpdated: 5,
    unmatched: 1,
    warning: "1 job-matching issue needs review before the next scheduled run.",
}

export const MOCK_VENDORS: VendorStat[] = [
    {
        id: "ironline",
        name: "Ironline Exteriors",
        trade: "Weather Barrier / Siding",
        correctInstalls: 412,
        deficiencies: 28,
        deficiencyRate: 6.4,
        firstPassPct: 89,
        rejected: 4,
        reworkCycles: 7,
        avgCorrectionDays: 2.4,
        avgAwaitingProofDays: 0.8,
    },
    {
        id: "coastal",
        name: "Coastal Waterproofing",
        trade: "Waterproofing",
        correctInstalls: 188,
        deficiencies: 41,
        deficiencyRate: 17.9,
        firstPassPct: 63,
        rejected: 11,
        reworkCycles: 19,
        avgCorrectionDays: 5.9,
        avgAwaitingProofDays: 2.1,
    },
]

export const MOCK_SYNC_ERRORS: SyncErrorItem[] = [
    {
        id: "err-1",
        severity: "error",
        message: 'No Jobtread job found for address "4402 Marlow St Unit B".',
        timestamp: "2026-07-28 06:10",
        category: "Job Match",
        reference: "J-1038",
        resolved: false,
    },
    {
        id: "err-2",
        severity: "warning",
        message: 'Vendor "Coastal Waterproofing LLC" matched two normalized names.',
        timestamp: "2026-07-27 22:04",
        category: "Vendor Match",
        reference: "J-1041",
        resolved: false,
    },
    {
        id: "err-3",
        severity: "warning",
        message: 'To-do export field "Due Date" missing from mapping profile.',
        timestamp: "2026-07-26 19:33",
        category: "Field Mapping",
        reference: "—",
        resolved: true,
    },
    {
        id: "err-4",
        severity: "error",
        message: "API token rejected (401). Sync fell back to cached dataset.",
        timestamp: "2026-07-25 04:02",
        category: "Auth",
        reference: "—",
        resolved: true,
    },
]

export const MOCK_EXPORT_MAPPING: ExportMappingField[] = [
    { id: "map-1", sourceLabel: "Deficiency ID", sourceValue: "", targetLabel: "To-Do Name Prefix", targetValue: "" },
    { id: "map-2", sourceLabel: "Checklist Item", sourceValue: "", targetLabel: "To-Do Name", targetValue: "" },
    { id: "map-3", sourceLabel: "Vendor", sourceValue: "", targetLabel: "Assigned To", targetValue: "" },
    { id: "map-4", sourceLabel: "Correction Due Date", sourceValue: "", targetLabel: "Due Date", targetValue: "" },
    { id: "map-5", sourceLabel: "Criticality", sourceValue: "", targetLabel: "Priority", targetValue: "" },
    { id: "map-6", sourceLabel: "Correction Link", sourceValue: "", targetLabel: "Description", targetValue: "" },
]