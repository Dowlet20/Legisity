"use client";

import { Home, Search, Server, FileClock, BookA, BookOpen } from "lucide-react";
import Image from "next/image";

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
} from "@/components/ui/sidebar";

import { useMyContext } from "@/context/mycontext";

export function AppSidebar() {
  const { change, setChange } = useMyContext();

  const items = [
    {
      title: change ? "Baş sahypa" : "Главная",
      url: "/",
      icon: Home,
    },
    {
      title: change ? "Güýjini ýitiren namalar" : "Утратившие силу акты",
      url: "/kone-namalar",
      icon: FileClock,
    },
    {
      title: change ? "Kodekslere we Kanunlara ylmy-tejribe düşündirişler" : "Научно-практические комментарии и Кодексам и законам",
      url: "/all-cotegory",
      icon: Server,
    },
    {
      title: change ? "Hukuk sözlügi" : "Юридический словарь",
      url: "/dictionary",
      icon: BookA,
    },
    {
      title: "Harby doktrina",
      url: "/for-cotegory/17",
      icon: BookOpen,
    },
  ];

  const {
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const changeLanguage = (toggle: boolean) => {
    setChange(toggle);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="text-[16px] m-1 h-[51px] gap-3"
                    tooltip={item.title}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon style={{ width: "22px", height: "22px" }} />
                      <div className="flex">
                        <span className="inline-block font-roboto_medium">
                          {item.title}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                  <SidebarSeparator />
                </SidebarMenuItem>
              ))}
              {!open && (window.innerWidth < 1300) && (
                <SidebarMenuItem key={"language"} className="flex mt-[15px]">
                  <SidebarMenuButton
                    className="text-[16px] flex items-center justify-center m-1 h-[45px] gap-3"
                    tooltip={"Türkmen dili"}
                    onClick={() => changeLanguage(true)}
                    asChild
                  >
                    <div>
                      <Image
                        alt="Turkmen"
                        width={40}
                        height={40}
                        src={"/flags/turkmenistan.png"}
                      />
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    className="text-[16px] m-1 h-[45px] gap-3"
                    tooltip={"Rus dili"}
                    onClick={() => changeLanguage(false)}
                    asChild
                  >
                    <div>
                      <Image
                        alt="Russia"
                        width={40}
                        height={40}
                        src={"/flags/russia.png"}
                      />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {(window.innerWidth > 1300) && (
                <SidebarMenuItem key={"language"} className="flex mt-[15px]">
                  <SidebarMenuButton
                    className="text-[16px] flex items-center justify-center m-1 h-[45px] gap-3"
                    tooltip={"Türkmen dili"}
                    onClick={() => changeLanguage(true)}
                    asChild
                  >
                    <div>
                      <Image
                        alt="Turkmen"
                        width={40}
                        height={40}
                        src={"/flags/turkmenistan.png"}
                      />
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    className="text-[16px] m-1 h-[45px] gap-3"
                    tooltip={"Rus dili"}
                    onClick={() => changeLanguage(false)}
                    asChild
                  >
                    <div>
                      <Image
                        alt="Russia"
                        width={40}
                        height={40}
                        src={"/flags/russia.png"}
                      />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
