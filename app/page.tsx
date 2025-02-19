"use client"
import Carousel from "@/components/Carousel";
import { countries } from "@/components/Data";
import { ChangeEvent, useEffect, useState } from "react"
import { ModeToggle } from "@/components/toggleButton"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"

import { SidebarTrigger } from "../components/ui/sidebar";
import axiosInstance from "@/utils/axiosInstance";
import { useMyContext } from "@/context/mycontext"
import Link from "next/link";
import { base_URL } from "@/utils/axiosInstance";

export default function Home() {
  const [short, setShort] = useState(true);
  const [namalar, setNamalar] = useState<any>([]);
  const [permanlar, setPermanlar] = useState<any>([]);
  const [selectedNama, setSelectedNama] = useState("0");
  const [search, setSearch] = useState('');
  const { change } = useMyContext();
  const [information, setInformation] = useState<any>([]);
  const { theme } = useTheme();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const months = ["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "Iýun", "Iýul", "Awgust", "Sentýabr", "Oktýabr", "Noýabr", "Dekabr"];

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);


      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);


      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/get-permanlar/${selectedNama}?active=false${year !== 0 ? `&year=${year}` : ""}${month ? `&month=${month}` : ""}${search ? `&search=${search}` : ""}`;
      console.log(url);
      try {
        const response = await axiosInstance?.get(url);
        setPermanlar(response?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    console.log(selectedNama)
    if (selectedNama !== "0") {
      fetchData();
    }
  }, [selectedNama, search]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/get-information";
      try {
        const response = await axiosInstance?.get(url);
        setInformation(response?.data);
        console.log(response?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);


  const handleSelectNama = (value: string) => {
    setSelectedNama(value);
    setShort(false);

  }

  const handleSelectYear = (value: string) => {
    setYear(parseInt(value, 10));
  }

  const handleSelectMonth = (value: string) => {
    if (value === "0") {
      setMonth("");
    }
    else {
      setMonth(value);
    }

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance?.get(`/api/get-namalar`);
        setNamalar(response?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearch(change ? suggestion?.title_tm : suggestion?.title_ru);
    setShowDropdown(false);
    router.push(`/perman/${suggestion?.id}`);
  };
  return (
    <div className="flex flex-col items-center">
      <nav className="border-b-[1px] h-[60px] border-gray-300 dark:border-gray-700 flex items-center justify-between pl-2 w-full sticky top-0  z-30 bg-white dark:bg-gray-950 bg-opacity-30 backdrop-blur-md">
        {windowWidth < 1300 ? (<SidebarTrigger />) : (<div></div>)}
        <Link href="/">
          {
            theme === "light" || theme === undefined ? (
              <Image
                alt="logo"
                src={'/logo.svg'}
                height={80}
                width={200}
                className="dark:white"
              />
            ) : (
              <Image
                alt="logo white"
                src={'/logo_white.svg'}
                height={80}
                width={200}
                className="dark:white"
              />
            )
          }
        </Link>
        <div className="mr-4 my-[6px]">
          <ModeToggle />
        </div>
      </nav>
      <Carousel images={countries} />
      <main className="w-[95%]">
        <section className="flex items-center mx-3 mt-[50px] justify-between gap-5 relative">
          <input
            type="text"
            value={search || ''}
            onChange={handleChange}
            onFocus={() => search && setShowDropdown(true)}
            className="w-full p-[5px] border text-[16px] border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-gray-600 focus:outline-none"
            placeholder={`${change ? "Gözleg..." : "Поиск..."}`}
          />
          {showDropdown && permanlar?.length > 0 && (
            <div
              className="absolute left-0 top-[-45px] right-8  mt-[90px] 
              bg-white border border-gray-300 rounded shadow-lg z-10"
            >
              {permanlar?.map((item: any, index: any) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(item)
                  }
                  className="p-2 hover:bg-gray-200 cursor-pointer block w-full"
                >
                  {change ? item?.title_tm : item?.title_ru}
                </button>
              ))}
            </div>
          )}
          <div className="w-full">
            <Select onValueChange={handleSelectNama}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue placeholder={`${change ? "Namanyň görnüşini saýlaň" : "Выберите..."}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[16px]">
                    {change ? "Namanyň görnüşi" : "По-русский"}
                  </SelectLabel>
                  {!Array.isArray(namalar) ? [] : namalar.map((nama: any) => {
                    return (
                      <SelectItem key={nama?.id} className="text-[16px]" value={nama?.id}>
                        {change ? nama?.title_tm : nama?.title_ru}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline"
            onClick={() => { setShort(toggle => !toggle) }}>
            {!short ? (change ? "Maglumat" : "Инфо") : (change ? "Tablissa" : "Таблица")}
          </Button>
        </section>
        <div className="flex items-center pr-3 mt-3 justify-end w-full gap-5">
          <div className="w-[120px]">
            <Select onValueChange={handleSelectYear}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue placeholder={change ? "Ýyly" : "Год"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    key={0}
                    className="text-[16px]"
                    value={"0"}
                  >
                    Hemmesi
                  </SelectItem>
                  {years?.map((year: any) => {
                    return (
                      <SelectItem
                        key={year}
                        className="text-[16px]"
                        value={year}
                      >
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[120px]">
            <Select onValueChange={handleSelectMonth}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue placeholder={change ? "Aýy" : "месяц"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    key={"bos"}
                    className="text-[16px]"
                    value={"0"}
                  >
                    Hemmesi
                  </SelectItem>
                  {months?.map((month: any) => {
                    return (
                      < SelectItem
                        key={month}
                        className="text-[16px]"
                        value={month}
                      >
                        {month}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedNama !== "0" && !short && (
          <section className="mt-[40px] border-[1px] m-3 rounded-md">
            <div>
              <Table>
                <TableHeader className="text-[16px]">
                  <TableRow>
                    <TableHead className="w-[50px]  text-gray-800">{change ? "T/B" : "Н"}</TableHead>
                    <TableHead className="text-center  text-gray-800">{change ? "Ady" : "Имя"}</TableHead>
                    <TableHead className="w-[50px]  text-gray-800">{change ? "Aýy" : "Месяц"}</TableHead>
                    <TableHead className="w-[50px]  text-gray-800">{change ? "Ýyly" : "Год"}</TableHead>
                    <TableHead className="w-[90px]  text-gray-800">{change ? "Belgisi" : "Символ"}</TableHead>
                    <TableHead className="w-[90px]  text-gray-800">{change ? "Ýükle" : "Скачать"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-[16px]">
                  {permanlar.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        {change ? "Maglumat ýok" : "Нет доступных данных"}
                      </TableCell>
                    </TableRow>
                  ) : (!Array.isArray(permanlar) ? [] :
                    permanlar.map((perman: any, index: number) => (
                      <TableRow key={perman.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="text-justify">
                            <a href={`/perman/${perman.id}`} className="hover:underline flex justify-center">
                              {change ? perman.title_tm : perman.title_ru}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>{change ? perman.month : perman.month_ru}</TableCell>
                        <TableCell>{perman.year}</TableCell>
                        <TableCell>{perman.number}</TableCell>
                        <TableCell className="flex justify-center">
                          <a
                            href={`${base_URL}${change ? perman?.pdf : perman?.pdf_rus}`}
                          >
                            <Image
                              alt="pdf icon"
                              src={'/pdf.png'}
                              height={25}
                              width={25}
                              className="dark:white"
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        )}
        {
          short && (
            <section className="mt-[40px] font-creato_display text-[18px]  m-3 rounded-md">
              <Accordion type="multiple" >
                {/* multiple */}
                {Array.isArray(information) && information.map((info: any) => {
                  return (
                    <AccordionItem key={info?.id} value={info?.id}>
                      <AccordionTrigger>
                        {change ? info?.title_tm : info?.title_ru}
                      </AccordionTrigger>
                      <AccordionContent>
                        <i>
                          {change ? info?.description_tm : info?.description_ru}
                        </i>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </section>

          )
        }
      </main>
    </div>
  );
}
