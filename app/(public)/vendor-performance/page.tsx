import React from "react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

const filters = ["", "", "", ""];

type RateLevel = "good" | "warn" | "bad";

const rateStyles: Record<RateLevel, string> = {
  good: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  warn: "bg-amber-50 text-amber-600 border border-amber-200",
  bad: "bg-rose-50 text-rose-500 border border-rose-200",
};

const vendors: {
  name: string;
  trade: string;
  correctInstalls: number;
  deficiencies: number;
  deficiencyRate: string;
  rateLevel: RateLevel;
  firstPass: string;
  rejected: number;
  reworkCycles: number;
  avgCorrection: string;
  avgAwaitingProof: string;
}[] = [
  {
    name: "IRONLINE EXTERIORS",
    trade: "WEATHER BARRIER / SIDING",
    correctInstalls: 412,
    deficiencies: 28,
    deficiencyRate: "6.4",
    rateLevel: "good",
    firstPass: "89%",
    rejected: 4,
    reworkCycles: 7,
    avgCorrection: "2.4 DAYS",
    avgAwaitingProof: "0.8 DAYS",
  },
  {
    name: "COASTAL WATERPROOFING",
    trade: "WATERPROOFING",
    correctInstalls: 188,
    deficiencies: 41,
    deficiencyRate: "17.9",
    rateLevel: "bad",
    firstPass: "63%",
    rejected: 11,
    reworkCycles: 19,
    avgCorrection: "5.9 DAYS",
    avgAwaitingProof: "2.1 DAYS",
  },
  {
    name: "BARRETT FRAMING CO.",
    trade: "FRAMING",
    correctInstalls: 356,
    deficiencies: 33,
    deficiencyRate: "8.5",
    rateLevel: "warn",
    firstPass: "81%",
    rejected: 6,
    reworkCycles: 12,
    avgCorrection: "3.6 DAYS",
    avgAwaitingProof: "1.4 DAYS",
  },
  {
    name: "SUMMIT WINDOW & DOOR",
    trade: "OPENINGS",
    correctInstalls: 221,
    deficiencies: 9,
    deficiencyRate: "3.9",
    rateLevel: "good",
    firstPass: "94%",
    rejected: 1,
    reworkCycles: 2,
    avgCorrection: "1.7 DAYS",
    avgAwaitingProof: "0.6 DAYS",
  },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function VendorRow({ vendor }: { vendor: (typeof vendors)[number] }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-6">
        <div className="text-[13px] font-bold text-slate-900">
          {vendor.name}
        </div>
        <div className="mt-0.5 text-[10px] font-semibold tracking-wide text-slate-400">
          {vendor.trade}
        </div>
      </td>
      <td className="py-6 pr-4 text-[14px] font-bold text-slate-800">
        {vendor.correctInstalls}
      </td>
      <td className="py-6 pr-4 text-[14px] font-bold text-slate-800">
        {vendor.deficiencies}
      </td>
      <td className="py-6 pr-4">
        <span
          className={`inline-block rounded px-2.5 py-1 text-[11px] font-bold ${rateStyles[vendor.rateLevel]}`}
        >
          {vendor.deficiencyRate}
        </span>
      </td>
      <td className="py-6 pr-4 text-[14px] font-bold text-slate-900">
        {vendor.firstPass}
      </td>
      <td className="py-6 pr-4 text-[14px] font-bold text-slate-800">
        {vendor.rejected}
      </td>
      <td className="py-6 pr-4 text-[14px] font-bold text-slate-800">
        {vendor.reworkCycles}
      </td>
      <td className="py-6 pr-4 text-[13px] font-semibold text-slate-600">
        {vendor.avgCorrection}
      </td>
      <td className="py-6 pr-4 text-[13px] font-semibold text-slate-600">
        {vendor.avgAwaitingProof}
      </td>
      <td className="py-6 pr-6">
        <button
          type="button"
          className="text-[11px] font-bold tracking-wide text-slate-800 hover:text-slate-950"
        >
          NORMALIZE
        </button>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function VendorPerformancePage() {
  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Filter bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <span className="text-[11px] font-semibold tracking-wide text-slate-400 shrink-0">
            FILTER
          </span>
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-4">
            {filters.map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-lg border border-slate-200 bg-[#faf8f4]"
              />
            ))}
          </div>
        </div>

        {/* Vendor table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <table className="w-full min-w-[1400px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  VENDOR
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  CORRECT INSTALLS
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  DEFICIENCIES
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  DEFICIENCY RATE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  FIRST-PASS
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  REJECTED
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  REWORK CYCLES
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  AVG CORRECTION
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  AVG AWAITING PROOF
                </th>
                <th className="py-4 pr-6 text-left text-[10px] font-semibold tracking-widest text-slate-400" />
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <VendorRow key={vendor.name} vendor={vendor} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
