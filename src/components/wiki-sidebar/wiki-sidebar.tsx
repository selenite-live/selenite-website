import React, { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/_ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/_ui/collapsible";
import WikiNavigationServices from "@/services/wiki-navigation/wiki-navigation";
import { WikiNavigation, WikiNavigationGroup, WikiNavigationItem } from "@/types/wiki-navigation";
import Link from "next/link";
import { AlbumIcon, ChevronRightIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "@/components/_ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/_ui/dropdown-menu";

export function AppSidebar(): ReactNode {
  const navigationItems: WikiNavigation[] = WikiNavigationServices.getNavigationItem();

  return (
    <Sidebar collapsible={"icon"} side={"left"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <AlbumIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Selenite Lost Contact</span>
                    <span className="truncate text-xs">Official Documentation</span>
                  </div>
                  <ChevronsRightIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">Content</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map(({ title, items }: WikiNavigation) => (
          <SidebarGroup key={title}>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item: WikiNavigationGroup) => (
                <Collapsible key={item.title} asChild={true} defaultOpen={false}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild={true} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem: WikiNavigationItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1 group-data-[state=collapsed]:hidden">
          <Card className="shadow-none">
            <form>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm">Subscribe to our newsletter</CardTitle>
                <CardDescription>Opt-in to receive updates and news about the sidebar.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2.5 p-4">
                <SidebarInput type="email" placeholder="Email" />
                <Button className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none" size="sm">
                  Subscribe
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
