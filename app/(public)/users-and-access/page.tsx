import React from "react";
import { Search, KeyRound } from "lucide-react";

// ------------------------------------------------------------------
// Fake Data
// ------------------------------------------------------------------

type Role = "PROJECT MANAGER" | "ADMINISTRATOR" | "SUPERINTENDENT";
type Status = "ACTIVE" | "DEACTIVATED";

const roleStyles: Record<Role, string> = {
  "PROJECT MANAGER": "bg-sky-50 text-sky-600 border border-sky-200",
  ADMINISTRATOR: "bg-amber-50 text-amber-600 border border-amber-200",
  SUPERINTENDENT: "bg-violet-50 text-violet-600 border border-violet-200",
};

const statusStyles: Record<Status, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  DEACTIVATED: "bg-slate-100 text-slate-400 border border-slate-200",
};

const avatarStyles = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
];

const users: {
  name: string;
  email: string;
  role: Role;
  jobAccess: string;
  permissions: string;
  lastActiveDate: string;
  lastActiveTime: string;
  status: Status;
  avatarClass: string;
}[] = [
  {
    name: "MONI ROY",
    email: "MONI.ROY@PROOFBUILDERS.COM",
    role: "PROJECT MANAGER",
    jobAccess: "ASSIGNED JOBS ONLY",
    permissions: "3 OF 5 ENABLED",
    lastActiveDate: "2026-07-28",
    lastActiveTime: "08:14",
    status: "ACTIVE",
    avatarClass: avatarStyles[0],
  },
  {
    name: "DANE WHITFIELD",
    email: "DANE@PROOFBUILDERS.COM",
    role: "ADMINISTRATOR",
    jobAccess: "ALL JOBS",
    permissions: "5 OF 5 ENABLED",
    lastActiveDate: "2026-07-28",
    lastActiveTime: "09:02",
    status: "ACTIVE",
    avatarClass: avatarStyles[1],
  },
  {
    name: "PRIYA RAMAN",
    email: "PRIYA@PROOFBUILDERS.COM",
    role: "SUPERINTENDENT",
    jobAccess: "ASSIGNED JOBS ONLY",
    permissions: "1 OF 5 ENABLED",
    lastActiveDate: "2026-07-27",
    lastActiveTime: "17:41",
    status: "ACTIVE",
    avatarClass: avatarStyles[2],
  },
  {
    name: "CARL BENITEZ",
    email: "CARL@PROOFBUILDERS.COM",
    role: "SUPERINTENDENT",
    jobAccess: "ASSIGNED JOBS ONLY",
    permissions: "0 OF 5 ENABLED",
    lastActiveDate: "2026-05-12",
    lastActiveTime: "11:20",
    status: "DEACTIVATED",
    avatarClass: avatarStyles[3],
  },
  {
    name: "TASHA LINDGREN",
    email: "TASHA@PROOFBUILDERS.COM",
    role: "PROJECT MANAGER",
    jobAccess: "ALL JOBS",
    permissions: "4 OF 5 ENABLED",
    lastActiveDate: "2026-07-28",
    lastActiveTime: "07:55",
    status: "ACTIVE",
    avatarClass: avatarStyles[4],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

// ------------------------------------------------------------------
// Reusable bits
// ------------------------------------------------------------------

function UserRow({ user }: { user: (typeof users)[number] }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${user.avatarClass}`}
          >
            {initials(user.name)}
          </div>
          <div>
            <div className="text-[13px] font-bold text-slate-800">
              {user.name}
            </div>
            <div className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="py-5 pr-4">
        <span
          className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${roleStyles[user.role]}`}
        >
          {user.role}
        </span>
      </td>
      <td className="py-5 pr-4 text-[11px] font-bold tracking-wide text-slate-700">
        {user.jobAccess}
      </td>
      <td className="py-5 pr-4 text-[11px] font-bold tracking-wide text-slate-700">
        {user.permissions}
      </td>
      <td className="py-5 pr-4 text-[12px] font-semibold text-slate-600">
        <div>{user.lastActiveDate}</div>
        <div>{user.lastActiveTime}</div>
      </td>
      <td className="py-5 pr-4">
        <span
          className={`inline-block rounded px-2.5 py-1 text-[10px] font-bold tracking-wide ${statusStyles[user.status]}`}
        >
          {user.status}
        </span>
      </td>
      <td className="py-5 pr-4">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold tracking-wide text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <KeyRound className="h-3.5 w-3.5" />
          RESET
        </button>
      </td>
      <td className="py-5 pr-6">
        <button
          type="button"
          className="text-[11px] font-bold tracking-wide text-slate-800 hover:text-slate-950"
        >
          MANAGE
        </button>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------

export default function UsersPage() {
  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Search bar */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR EMAIL"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-[11px] font-semibold tracking-wide text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="w-full rounded-lg border border-slate-200 bg-white sm:w-64" />
          <div className="w-full rounded-lg border border-slate-200 bg-white sm:w-64" />
        </div>

        {/* Users table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  EMPLOYEE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  ROLE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  JOB ACCESS
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  PERMISSIONS
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  LAST ACTIVE
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400">
                  STATUS
                </th>
                <th className="py-4 pr-4 text-left text-[10px] font-semibold tracking-widest text-slate-400" />
                <th className="py-4 pr-6 text-left text-[10px] font-semibold tracking-widest text-slate-400" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user.email} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
