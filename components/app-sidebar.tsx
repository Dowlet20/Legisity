"use client"

import {Home, Search, Settings, Server, FileClock, BookA, BookOpen } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Baş sahypa",
    url: "#",
    icon: Home,
  },
  {
    title: "Umumy hukuk klassifikatory",
    url: "#",
    icon: Server,
  },
  {
    title: "Güýjini ýitiren namalar",
    url: "#",
    icon: FileClock,
  },
  {
    title: "Kodekslere we Kanunlara ylmy-tejribe düşündirişler",
    url: "#",
    icon: Search,
  },
  {
    title: "Hukuk sözlügi",
    url: "/dictionary",
    icon: BookA,
  },
  {
    title: "Giňişleýin gözleg",
    url: "#",
    icon: Search,
  },
  {
    title: "Harby doktrina",
    url: "#",
    icon: BookOpen,
  },
]
 
export function AppSidebar() {

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar
  } = useSidebar()
  

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-[16px] h-[50px] gap-3" tooltip={item.title} asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: '18px', height: '18px' }} />
                      <div className="flex">
                        <span className="inline-block">{item.title}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                  {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
                  <SidebarSeparator />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}