"use client";

import React, { useState } from "react";
import {
  FileText,
  ListChecks,
  FileSpreadsheet,
  Cloud,
  Image as ImageIcon,
  QrCode,
} from "lucide-react";

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-amber-400" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <div className="text-[12px] font-bold tracking-wide text-slate-800">
          {title}
        </div>
        <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
          {description}
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function TextField({
  label,
  placeholder,
  helper,
}: {
  label: string;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold tracking-wide text-slate-500">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
      {helper && (
        <div className="mt-1.5 text-[10px] font-semibold tracking-wide text-slate-400">
          {helper}
        </div>
      )}
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-slate-800">
          {title}
        </h3>
        {icon}
      </div>
      {children}
    </div>
  );
}

// ------------------------------------------------------------------
// Export type cards
// ------------------------------------------------------------------

type ExportCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
};

function ExportCard({
  icon,
  title,
  description,
  buttonLabel,
}: ExportCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-amber-600">{icon}</div>
        <div>
          <div className="text-[12px] font-bold tracking-wide text-slate-800">
            {title}
          </div>
          <div className="mt-1.5 text-[11px] font-medium leading-relaxed tracking-wide text-slate-500">
            {description}
          </div>
          <button
            type="button"
            className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2 text-[11px] font-bold tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Vendor token rows
// ------------------------------------------------------------------

const vendorTokens = [
  {
    vendor: "IRONLINE EXTERIORS",
    meta: "DEF-4411 · EXPIRES 2026-08-10",
  },
  {
    vendor: "COASTAL WATERPROOFING",
    meta: "DEF-4408 · EXPIRES 2026-08-03",
  },
  {
    vendor: "BARRETT FRAMING CO.",
    meta: "DEF-4390 · EXPIRED 2026-07-25",
  },
];

function VendorTokenRow({ vendor, meta }: (typeof vendorTokens)[number]) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
      <div>
        <div className="text-[12px] font-bold tracking-wide text-slate-800">
          {vendor}
        </div>
        <div className="mt-1 text-[10px] font-semibold tracking-wide text-slate-400">
          {meta}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
        >
          REGENERATE
        </button>
        <button
          type="button"
          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-[10px] font-bold tracking-wide text-red-500 hover:bg-red-50 transition-colors"
        >
          REVOKE
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function ExportsSettingsPage() {
  const [archiveEveryInspection, setArchiveEveryInspection] = useState(true);
  const [autoFileCorrection, setAutoFileCorrection] = useState(true);
  const [printQrCodes, setPrintQrCodes] = useState(true);
  const [requirePhotoMetadata, setRequirePhotoMetadata] = useState(true);
  const [includeCoverPage, setIncludeCoverPage] = useState(true);
  const [includeVersionFooter, setIncludeVersionFooter] = useState(true);
  const [includeVendorPricing, setIncludeVendorPricing] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-[1620px] grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left / main column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Generate an export */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold tracking-widest text-slate-800">
              GENERATE AN EXPORT
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
              SCOPE THE OUTPUT BEFORE GENERATING
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
              <TextField label="JOB" />
              <TextField label="DATE RANGE" />
              <TextField label="AUDIENCE" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ExportCard
                icon={<FileText className="h-5 w-5" />}
                title="BRANDED INSPECTION PDF"
                description="Full Right-On record with photos, notes, vendor attribution, and template version."
                buttonLabel="GENERATE PDF"
              />
              <ExportCard
                icon={<ListChecks className="h-5 w-5" />}
                title="DEFICIENCY REPORT"
                description="Open, overdue, and closed deficiencies with correction evidence and timelines."
                buttonLabel="GENERATE REPORT"
              />
              <ExportCard
                icon={<FileText className="h-5 w-5" />}
                title="JOBTREAD TO-DO CSV"
                description="Deficiencies formatted for direct import as JobTread to-dos using your mapping profile."
                buttonLabel="EXPORT CSV"
              />
              <ExportCard
                icon={<FileSpreadsheet className="h-5 w-5" />}
                title="EXCEL / CSV DATASET"
                description="Raw inspection, deficiency, and vendor rows for analysis outside Proof Builder."
                buttonLabel="EXPORT DATASET"
              />
            </div>
          </div>

          {/* QR codes & vendor correction links */}
          <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-800">
                QR CODES &amp; VENDOR CORRECTION LINKS
              </h3>
              <QrCode className="h-4 w-4 text-slate-400" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <TextField label="TOKEN EXPIRY" />
                <TextField label="CORRECTION LINK BASE URL" />

                <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] px-5 divide-y divide-slate-200">
                  <ToggleRow
                    title="PRINT QR CODES ON DEFICIENCY REPORTS"
                    description="Vendors scan to upload correction evidence without an account."
                    checked={printQrCodes}
                    onChange={setPrintQrCodes}
                  />
                  <ToggleRow
                    title="REQUIRE PHOTO METADATA ON VENDOR UPLOADS"
                    description="Rejects screenshots and images missing capture timestamps."
                    checked={requirePhotoMetadata}
                    onChange={setRequirePhotoMetadata}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-[#f7f5f1] p-5">
                <div className="text-[11px] font-bold tracking-widest text-slate-800">
                  ACTIVE VENDOR TOKENS
                </div>
                <div className="mt-2">
                  {vendorTokens.map((t) => (
                    <VendorTokenRow key={t.vendor} {...t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Google Drive Archive */}
          <Panel
            title="GOOGLE DRIVE ARCHIVE"
            icon={<Cloud className="h-4 w-4 text-slate-400" />}
          >
            <div className="mt-5 flex items-center gap-3">
              <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-600">
                CONNECTED
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-slate-500">
                ARCHIVE@PROOFBUILDERS.COM
              </span>
            </div>

            <div className="mt-5 space-y-5">
              <TextField label="ROOT ARCHIVE FOLDER" />
              <TextField
                label="FOLDER NAMING PATTERN"
                helper="TOKENS: {JOB}, {PHASE}, {DATE}, {INSPECTIONID}"
              />
            </div>

            <div className="mt-2 divide-y divide-slate-100 border-t border-slate-100">
              <ToggleRow
                title="ARCHIVE EVERY LOCKED INSPECTION"
                description="PDF plus original-resolution photos are copied on lock."
                checked={archiveEveryInspection}
                onChange={setArchiveEveryInspection}
              />
              <ToggleRow
                title="AUTO-FILE CORRECTION EVIDENCE"
                description="Correction photos land in the matching deficiency subfolder."
                checked={autoFileCorrection}
                onChange={setAutoFileCorrection}
              />
            </div>
          </Panel>

          {/* PDF Layout & Compression */}
          <Panel
            title="PDF LAYOUT & COMPRESSION"
            icon={<ImageIcon className="h-4 w-4 text-slate-400" />}
          >
            <div className="mt-5 space-y-5">
              <TextField label="PHOTO LAYOUT" />
              <TextField
                label="IMAGE COMPRESSION"
                helper="APPLIES TO EVERY GENERATED PDF AND ARCHIVE COPY."
              />
            </div>

            <div className="mt-2 divide-y divide-slate-100 border-t border-slate-100">
              <ToggleRow
                title="INCLUDE COVER PAGE WITH PROOF BUILDERS BRANDING"
                description=""
                checked={includeCoverPage}
                onChange={setIncludeCoverPage}
              />
              <ToggleRow
                title="INCLUDE TEMPLATE VERSION FOOTER ON EVERY PAGE"
                description=""
                checked={includeVersionFooter}
                onChange={setIncludeVersionFooter}
              />
              <ToggleRow
                title="INCLUDE VENDOR PRICING REFERENCES"
                description=""
                checked={includeVendorPricing}
                onChange={setIncludeVendorPricing}
              />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
