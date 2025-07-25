"use client"

import {ChangeEvent, useEffect, useState} from "react"
import {ModeToggle} from "@/components/toggleButton"
import Image from "next/image";
import {useRouter} from 'next/navigation';
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTheme } from "next-themes"
 
import { SidebarTrigger } from "@/components/ui/sidebar";
import axiosInstance from "@/utils/axiosInstance";
import { useMyContext } from "@/context/mycontext"
import Link from "next/link";


export default function Home() {
  const [namalar, setNamalar] = useState<any>([]);
  const [permanlar, setPermanlar] = useState<any>([]);
  const [selectedNama, setSelectedNama] = useState("0");
  const [search, setSearch] = useState('');
  const {change} = useMyContext();
  const {theme} = useTheme();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");
  const years = [1999,2000, 2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const months = ["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "Iýun", "Iýul", "Awgust","Sentýabr", "Oktýabr", "Noýabr", "Dekabr"];
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
      const url = `/api/get-permanlar/${selectedNama}?active=true${year !==0 ? `&year=${year}`: ""}${month ? `&month=${month}`:""}${search ? `&search=${search}`:""}`;
      try {
        const response = await axiosInstance?.get(url);
        setPermanlar(response?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    if (selectedNama !=="0") {
      fetchData();
    }
  }, [selectedNama, search,year,month]);



  const handleSelectNama = (value: string) => {
    setSelectedNama(value);

  }

  const handleSelectYear = (value: string) => {
    setYear(parseInt(value, 10));
  }

  const handleSelectMonth = (value: string) => {
    if (value==="0") {
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
    <div className="flex flex-col items-center 2xl:ml-[200px]">
      <nav className="border-b-[1px] border-gray-300 dark:border-gray-700 flex items-center justify-between pl-2 w-full sticky top-0  z-30 bg-white dark:bg-gray-950 bg-opacity-30 backdrop-blur-md">
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
      <h1 className="mt-[20px] text-[24px] font-roboto_medium">{change ? "Güýjini ýitiren namalar" : "Утратившие силу акты"}</h1>
      <main className="w-[80%]">
        <section className="flex items-center mx-3 mt-[20px] justify-between gap-5 relative">
          <input
            type="text"
            value={search || ''}
            onChange={handleChange}
            onFocus={() => search && setShowDropdown(true)}
            className="w-full p-[5px] border text-[16px] border-gray-300 dark:border-gray-700 rounded-md focus:ring-1 focus:ring-gray-600 focus:outline-none"
            placeholder={change ? "Gözleg...": "Поиск..."}
          />
          {/* {showDropdown && permanlar?.length > 0 && (
            <div className="absolute left-0 right-8 top-0  mt-[90px] bg-white border border-gray-300 rounded shadow-lg z-10">
                {permanlar?.map((item: any, index:any) => (
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
            )} */}
          <div className="w-full">
            <Select onValueChange={handleSelectNama}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue  placeholder={change ? "Namanyň görnüşini saýlaň" : "Выберите..."} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[16px]">
                    { change ? "Namanyň görnüşi" : "По-русский"}
                  </SelectLabel>
                  {!Array.isArray(namalar) ? [] : namalar.map((nama:any) => {
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
        </section>
        <div className="flex items-center pr-3 mt-3 justify-end w-full gap-5">
          <div className="w-[120px]">
            <Select onValueChange={handleSelectYear}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue  placeholder={change ? "Ýyly" : "Год"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    key={0} 
                    className="text-[16px]" 
                    value={"0"}
                  >
                    {change ? "Hemmesi" : "Все"}
                  </SelectItem>
                  {years?.map((year: any)=> {
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
                <SelectValue  placeholder={change ? "Aýy" :"Месяц"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    key={"bos"} 
                    className="text-[16px]" 
                    value={"0"}
                  >
                    {change ? "Hemmesi" : "Все"}
                  </SelectItem>
                  {months?.map((month: any)=> {
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
        <section className="mt-[40px] border-[1px] m-3 rounded-md">
          <div>
            <Table>
              <TableHeader className="text-[16px]">
                <TableRow>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">{change ? "T/B" : "Н"}</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">ID</TableHead>
                  <TableHead className="text-center font-roboto_medium text-gray-800">{change ? "Ady" : "Имя"}</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">{change ? "Aýy" : "Месяц"}</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">{change ? "Ýyly":"Год"}</TableHead>
                  <TableHead className="w-[90px] font-roboto_medium text-gray-800">{change ? "Belgisi" : "Символ"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-[16px]">
                {permanlar.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      {change ? "Bu bölümde güýjini ýitiren nama ýok." : "Нет доступных данных"}
                    </TableCell>
                  </TableRow>
                ) : (!Array.isArray(permanlar) ? [] : 
                  permanlar.map((perman:any) => (
                    <TableRow key={perman.id}>
                      <TableCell className="font-medium">{perman.id}</TableCell>
                      <TableCell>{perman.id}</TableCell>
                      <TableCell>
                        <div className="text-justify">
                          <a href={`/perman/${perman.id}`} className="hover:underline">
                            {change ? perman.title_tm : perman.title_ru}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>{change ? perman.month : perman.month_ru}</TableCell>
                      <TableCell>{perman.year}</TableCell>
                      <TableCell>{perman.number}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}
