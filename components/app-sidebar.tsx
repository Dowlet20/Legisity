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
import { useEffect, useState } from "react";

export function AppSidebar() {
  const { change, setChange } = useMyContext();
  const [windowWidth, setWindowWidth] = useState<number>(0); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      
      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
      url: "/ylmy-dusundiris",
      icon: Server,
    },
    {
      title: change ? "Hukuk sözlügi" : "Юридический словарь",
      url: "/sozluk",
      icon: BookA,
    },
    {
      title: change ? "Gözleg" : "Поиск",
      url: "/gozleg",
      icon: Search,
    },
    {
      title: "Harby doktrina",
      url: "/ylmy-tejribe/17",
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
    sessionStorage.setItem('isActive', toggle.toString());
  };

  return (
    <Sidebar collapsible="icon" className="2xl:ml-[200px] 2xl:border-l">
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
                        <span className="inline-block">
                          {item.title}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                  <SidebarSeparator />
                </SidebarMenuItem>
              ))}
              {!open && (windowWidth < 1300) && (
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
              {(windowWidth > 1300) && (
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
              {!open && (windowWidth < 1300)  && (
                <SidebarMenuItem className="flex items-center h-[55vh]">
                    <SidebarMenuButton
                      className="m-1 h-auto"
                      asChild
                    >
                      <a>
                        <Image
                          alt="ron"
                          width={250}
                          height={250}
                          src={"/shewron.png"}
                        />
                      </a>
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
