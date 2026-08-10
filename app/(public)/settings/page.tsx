"use client";

import React, { useState } from "react";
import { Palette, Plug, CheckCircle2 } from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

const integrations = [
  {
    name: "JOBTREAD",
    description: "JOBS, VENDORS, AND TO-DO EXPORT",
  },
  {
    name: "GOOGLE DRIVE",
    description: "INSPECTION ARCHIVE",
  },
  {
    name: "SENDGRID",
    description: "CORRECTION LINK DELIVERY",
  },
  {
    name: "SLACK",
    description: "OVERDUE DEFICIENCY ALERTS",
  },
];

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold tracking-wide text-slate-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold tracking-wide text-slate-500">
        {label}
      </label>
      <textarea
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-[12px] font-bold uppercase tracking-wide text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}

function IntegrationRow({
  name,
  description,
  connected,
  onToggle,
}: {
  name: string;
  description: string;
  connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6 last:border-0">
      <div className="flex items-center gap-4">
        <Plug className="h-4 w-4 rotate-90 text-slate-400" />
        <div>
          <div className="text-[13px] font-bold tracking-wide text-slate-900">
            {name}
          </div>
          <div className="mt-0.5 text-[10px] font-semibold tracking-wide text-slate-400">
            {description}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {connected ? (
          <span className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-bold tracking-wide text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            CONNECTED
          </span>
        ) : (
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold tracking-wide text-slate-400">
            NOT CONNECTED
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-[11px] font-bold tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
        >
          {connected ? "DISCONNECT" : "CONNECT"}
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

type Tab = "BRANDING" | "INTEGRATIONS";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("BRANDING");

  const [companyName, setCompanyName] = useState("PROOF BUILDERS");
  const [reportTagline, setReportTagline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [footerDisclaimer, setFooterDisclaimer] = useState(
    "THIS REPORT DOCUMENTS OBSERVED CONDITIONS AT THE TIME OF INSPECTION AND DOES NOT CONSTITUTE AN ENGINEERING OPINION.",
  );

  const [connections, setConnections] = useState<Record<string, boolean>>({
    JOBTREAD: true,
    "GOOGLE DRIVE": true,
    SENDGRID: true,
    SLACK: true,
  });

  const toggleConnection = (name: string) =>
    setConnections((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1620px]">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setTab("BRANDING")}
            className={`cursor-pointer pb-3 text-xs font-bold tracking-widest transition-colors ${
              tab === "BRANDING"
                ? "border-b-2 border-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            BRANDING
          </button>
          <button
            type="button"
            onClick={() => setTab("INTEGRATIONS")}
            className={`cursor-pointer pb-3 text-xs font-bold tracking-widest transition-colors ${
              tab === "INTEGRATIONS"
                ? "border-b-2 border-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            INTEGRATIONS
          </button>
        </div>

        {/* Branding tab */}
        {tab === "BRANDING" && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Branding form */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-800">
                  PROOF BUILDERS BRANDING
                </h3>
                <Palette className="h-4 w-4 text-slate-400" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TextField
                  label="COMPANY NAME"
                  value={companyName}
                  onChange={setCompanyName}
                />
                <TextField
                  label="REPORT TAGLINE"
                  value={reportTagline}
                  onChange={setReportTagline}
                />
                <TextField
                  label="CONTACT EMAIL"
                  value={contactEmail}
                  onChange={setContactEmail}
                />
                <TextField label="PHONE" value={phone} onChange={setPhone} />
              </div>

              <div className="mt-5">
                <TextArea
                  label="REPORT FOOTER DISCLAIMER"
                  value={footerDisclaimer}
                  onChange={setFooterDisclaimer}
                />
              </div>
            </div>

            {/* Report preview */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold tracking-widest text-slate-800">
                REPORT PREVIEW
              </h3>

              <div className="mt-6 rounded-xl border border-slate-200 p-5">
                <div className="text-lg font-bold text-slate-900">
                  {companyName || "PROOF BUILDERS"}
                </div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-amber-600">
                  {reportTagline || "RIGHT-ON METHOD · FIELD DOCUMENTATION"}
                </div>
                <div className="mt-3 h-0.5 w-full bg-amber-500" />

                <div className="mt-4 space-y-2">
                  <div className="h-2 w-3/4 rounded bg-slate-100" />
                  <div className="h-2 w-full rounded bg-slate-100" />
                  <div className="h-2 w-2/3 rounded bg-slate-100" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-24 rounded-lg bg-[#f0ece2]" />
                  <div className="h-24 rounded-lg bg-[#f0ece2]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrations tab */}
        {tab === "INTEGRATIONS" && (
          <div className="mt-6 rounded-xl border border-slate-200/70 bg-white shadow-sm">
            <h3 className="px-6 py-5 text-xs font-bold tracking-widest text-slate-800 border-b border-slate-100">
              APPLICATION INTEGRATIONS
            </h3>
            <div>
              {integrations.map((i) => (
                <IntegrationRow
                  key={i.name}
                  name={i.name}
                  description={i.description}
                  connected={connections[i.name]}
                  onToggle={() => toggleConnection(i.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
