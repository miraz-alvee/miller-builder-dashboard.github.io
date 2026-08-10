import { ReceiptText } from 'lucide-react'
interface InspectionHistoryRecordProps {
    onOpen: () => void
}

export default function InspectionHistoryRecord({ onOpen }: InspectionHistoryRecordProps) {
    return (
        <div className="min-h-screen bg-[#F7F4EF] p-6 text-[#111111]">
            <div className="space-y-6">
                {/* Top Header Tracker Line */}
                <header>
                    <h1 className="font-bebas text-xs font-medium uppercase tracking-wider text-[#00000099] sm:text-sm">
                        Open previous inspections from here. Locked inspections open as read-only records; drafts can be reopened and completed.
                    </h1>
                </header>

                <div className="bg-[#FFFFFF] border border-[#BBF7D0] drop-shadow-xl rounded-[10px]">
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                        <div>
                            <h2 className="font-bebas text-[15px] font-medium leading-7 tracking-wide text-[#141414] sm:text-lg">
                                PB-26-0001-TILEHYDR-001-D01
                            </h2>
                            <p className="mt-1 font-bebas font-medium text-[10px] leading-5 text-xs text-[#00000080] sm:text-sm">
                                7201 wesley · Tile - HydroBlok · Assigned: Unassigned · Opened: 2026-07-23
                            </p>
                            <h2 className="mt-2 bg-[#0000001A] w-full h-9 font-bebas text-base px-7 py-2 text-[#000000B2] rounded-[8px]">Locked  / Read Only</h2>
                        </div>

                        <div className="items-center gap-2 sm:flex-col sm:items-end">
                            <button 
                            onClick={onOpen}
                            className="rounded border border-[#00000022] bg-[#D4A017] px-2 py-1 font-bebas text-[10px] uppercase tracking-wider text-[#141414] sm:text-[14px] flex items-center gap-2">
                                <ReceiptText />
                                Open Inspection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
