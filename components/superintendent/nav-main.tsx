"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    mainTitle?: string;
    title?: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (url: string) => {
    if (url === "/superintendent") {
      return pathname === "/superintendent";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const handleItemClick = (url: string) => {
    router.push(url);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // মেইন সেকশন টাইটেল (Overview, Field Operations, Quality Program, Administration)
          if (item.mainTitle) {
            return (
              <div
                key={item.mainTitle}
                className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]"
              >
                {item.mainTitle}
              </div>
            );
          }

          const isItemActive = isRouteActive(item.url!);
          const hasActiveChild =
            item.items?.some((subItem) => isRouteActive(subItem.url)) ??
            false;
          const sectionIsActive = isItemActive || hasActiveChild;
          const hasChildren = Boolean(item.items?.length);

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => handleItemClick(item.url!)}
                  tooltip={item.title}
                  isActive={sectionIsActive}
                  className={cn(
                    "cursor-pointer font-bebas h-10 rounded-lg px-3 text-sm font-medium p-4",
                    sectionIsActive
                      ? "bg-linear-to-r from-[#B19F1A33] to-[#9999990D] border-l-4 border-[#D4AF37] text-white!"
                      : "text-[#B7BAC0] hover:text-white hover:bg-[#9999990D]",
                  )}
                >
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive || sectionIsActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={sectionIsActive}
                    className={cn(
                      "h-10 rounded-lg px-3 text-sm font-medium",
                      sectionIsActive ? "text-white" : "text-[#B7BAC0]",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubItemActive = isRouteActive(subItem.url);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={isSubItemActive}
                            className={
                              isSubItemActive ? "text-white" : "text-[#B7BAC0]"
                            }
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}