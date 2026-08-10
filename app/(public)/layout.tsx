"use client";
import { usePathname } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "@/components/superintendent/admin-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Format the pathname to a readable title
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    // Convert kebab-case to Title Case
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 border-b-4 border-[#F2A11E] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
          style={{ backgroundColor: "#FFFFFF", color: "#f8f9fa" }}
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 lg:hidden" />
            <Separator orientation="vertical" className="lg:hidden" />
            <Breadcrumb className="font-semibold text-slate-200 hover:text-slate-100 ml-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-[#1d1717] text-[16px]">
                    {getPageTitle()}
                    <h5 className="font-semibold text-[#F2A11E] text-[12px] ">
                      Right-On Method · Field Documentation
                    </h5>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 w-full bg-[#F7F4EF] p-4 sm:p-6 lg:p-8 ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
