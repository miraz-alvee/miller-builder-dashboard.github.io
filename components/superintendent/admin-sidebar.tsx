"use client";

import * as React from "react";
import {
  Database,
  Search,
  LayoutGrid,
  Star,
  Users,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import sidebarLogo from "@/public/images/sideabr-logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const navData = {
  navMain: [
    {
      mainTitle: "Overview",
    },
    {
      title: "Global Dashboard",
      url: "/",
      icon: LayoutGrid,
      // isActive: true,
    },
    {
      mainTitle: "Field Operations",
    },
    {
      title: "Job Management",
      url: "/job-management",
      icon: Users,
    },
    {
      title: "JobTread Sync",
      url: "/jobtread-sync",
      icon: Users,
    },
    {
      title: "Inspections",
      url: "/inspections",
      icon: Star,
    },
    {
      title: "Deficiency Oversight",
      url: "/deficiency-oversight",
      icon: Database,
    },
    {
      mainTitle: "Quality Program",
    },
    {
      title: "Template Manager",
      url: "/template-manager",
      icon: Search,
    },
    {
      title: "Vendor Performance",
      url: "/vendor-performance",
      icon: Search,
    },
    {
      title: "Reports & Exports",
      url: "/reports-and-exports",
      icon: Search,
    },
    {
      mainTitle: "Administration",
    },
    {
      title: "Users & Access",
      url: "/users-and-access",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Search,
    },
    {
      title: "Audit & Security",
      url: "/audit-and-security",
      icon: Search,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  const router = useRouter();

  const handleLogout = () => {
    router.push("/sign-in");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {state !== "collapsed" && (
        <SidebarHeader className=" bg-[#0F172A] p-3 items-center justify-center">
          <Image
            src={sidebarLogo}
            alt="logo"
            width={160}
            height={50}
            suppressHydrationWarning
          />
        </SidebarHeader>
      )}
      <SidebarContent className="pt-5 bg-[#0F172A]">
        <NavMain items={navData.navMain} />
      </SidebarContent>
      {state !== "collapsed" && (
        <SidebarFooter className=" p-3 bg-[#000000]">
          <Button
            onClick={handleLogout}
            className="cursor-pointer text-[#ffffff] text-[18px] w-full hover:bg-[#56606d] rounded-4xl flex justify-center items-center gap-4 py-2 mt-4 "
          >
            <LogOut className="size-5" />
            Logout
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
