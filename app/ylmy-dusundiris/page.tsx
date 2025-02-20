"use client"

import {useState, useEffect} from "react";
import {ModeToggle} from "@/components/toggleButton"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
import { SidebarTrigger } from "../../components/ui/sidebar";
import { useMyContext } from "@/context/mycontext";


const AllCotegory = () => {
  const kodeksler: any[] = [
    {
      'title_tm':'Türkmenistanyň Kodeksleri',
      'title_ru':'Кодексы Туркменистана',
      'id':1
    }, 
    {
      'title_tm':'Türkmenistanyň kanunlary',
      'title_ru':'Законы Туркменистана',
      'id':2
    },
  ];

  const namalar : any[] = [
    {
      "title_ru":"Научно-практический комментарий к Законам Туркменистана",
      "title_tm":"Türkmenistanyň Kanunyna ylmy-amaly düşündirişler",
      "id":1,
      "kodeks_id": 2,
    },
    {
      "title_ru":"Научно-практический комментарий к Гражданскому кодексу Туркменистана",
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler",
      "id":2,
      "kodeks_id": 1,
    },
  ];

  

  const permanlar = [
    {
      "namalar_id":1,
      "id":1,
      "title_tm":"«Administratiw önümçilik  hakynda» Türkmenistanyň  Kanunyna ylmy-amaly düşündirişler",
      "title_ru":"Научно-практический комментарий  к Закону Туркменистана Об административных процедурах",
      "pdf": "/pdf/1.pdf",
      "pdf_rus": "/pdf/turkmenistanyn_kanuny_ru/3.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":1,
      "id":2,
      "title_tm":"_Girew hakynda_ Türkmenistanyň kanunyna düşündiriş",
      "title_ru":"Комментарий к Закону Туркменистана _О залоге_",
      "pdf": "/pdf/turkmenistanyn_kanuny/2.pdf",
      "pdf_rus": "/pdf/4.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":3,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler I  ТОМ",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ I",
      "pdf": "/pdf/5.pdf",
      "pdf_rus": "/pdf/11.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":4,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler II  ТОМ",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ II",
      "pdf": "/pdf/6.pdf",
      "pdf_rus": "/pdf/12.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":5,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler III  ТОМ",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ III",
      "pdf": "/pdf/7.pdf",
      "pdf_rus": "/pdf/13.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":6,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler IV  ТОМ  (I bölek) (1)",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ IV (часть I)",
      "pdf": "/pdf/8.pdf",
      "pdf_rus": "/pdf/14.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":7,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler IV  ТОМ  (I bölek)",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ IV (часть II)",
      "pdf": "/pdf/9.pdf",
      "pdf_rus": "/pdf/15.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
    {
      "namalar_id":2,
      "id":8,
      "title_tm":"Türkmenistanyň Raýat kodeksine ylmy-tejribe düşündirişler V ТОМ",
      "title_ru":"Научно-практический комментарий  к Гражданскому кодексу Туркменистана ТОМ V",
      "pdf": "/pdf/10.pdf",
      "pdf_rus": "/pdf/16.pdf",
      "year":2020,
      "month":"-",
      "month_ru":"-",
      "number":"-",
      "is_active":false,
    },
  ]
  const [selectedKodeks, setSelectedKodeks] = useState("Namanyň görnüşini saýlaň");
  const [selectedNama, setSelectedNama] = useState("Namany saýlaň");

  const years = ["2017", "2018", "2019", "2020", "2021", "2022"];
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

  const {change} = useMyContext();

  const handleSelectKodeks = (value: string) => {
    setSelectedKodeks(value);
  }

  const handleSelectNama = (value: string) => {
    setSelectedNama(value);
  }

  
  

  return (
    <div className="flex flex-col items-center">
      <nav className="border-b-[1px] border-gray-300 dark:border-gray-700 flex items-center justify-between pl-2 w-full">
      {windowWidth < 1300 ? (<SidebarTrigger />) : (<div></div>)} 
        <div className="mr-4 my-2">
          <ModeToggle />
        </div>
      </nav>
      <main className="w-[95%]">
        <section className="flex items-center mx-3 mt-[40px] gap-5">
          <div className="w-1/2">
            <Select onValueChange={handleSelectKodeks}>
              <SelectTrigger className="text-[16px] flex-1">
                <SelectValue  placeholder={change ? "Namanyň görnüşini saýlaň":"Выберите..."} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[16px]">
                    {change ? "Namanyň görnüşi" : "По-русский"}
                  </SelectLabel>
                  {!Array.isArray(kodeksler) ? [] : kodeksler?.map((nama: any)=> {
                    return (
                    < SelectItem
                      key={nama?.id} 
                      className="text-[16px]" 
                      value={nama?.id}
                    >
                      {change ? nama.title_tm : nama.title_ru}
                    </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
        { selectedKodeks !== "Namanyň görnüşini saýlaň" &&
          <>
            <section className="flex items-center mx-3 mt-[30px] gap-5">
              <div className="w-full">
                <Select onValueChange={handleSelectNama}>
                  <SelectTrigger className="text-[16px] flex-1">
                    <SelectValue  placeholder={change ? "Namany saýlaň" : "Выберите"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-[16px]">{change ? "Namanyň görnüşi" : "По-русский"}</SelectLabel>
                      {!Array.isArray(namalar) ? [] : namalar?.map((nama: any) => {
                        return (
                        <SelectItem
                          key={nama?.id} 
                          className="text-[16px]" 
                          value={nama?.id}
                        >
                          {change ? nama.title_tm : nama.title_ru}
                        </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center w-full gap-5">
                <div className="w-full">
                  <Select>
                    <SelectTrigger className="text-[16px] flex-1">
                      <SelectValue  placeholder={change ? "Ýyly" : "Год"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {years?.map((year: any)=> {
                          return (
                          < SelectItem
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
                <div className="w-full">
                  <Select>
                    <SelectTrigger className="text-[16px] flex-1">
                      <SelectValue  placeholder={change ? "Aýy" : "Месяц"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
            </section>
            {selectedNama !== "Namany saýlaň" && (
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
                            {change ? "Maglumat ýok":"Нет доступных данных"}
                          </TableCell>
                        </TableRow>
                      ) : ( !Array.isArray(permanlar) ? [] :
                        permanlar.map((perman:any) => (
                          <TableRow key={perman.id}>
                            <TableCell className="font-medium">{perman.id}</TableCell>
                            <TableCell>{perman.id}</TableCell>
                            <TableCell>
                              <div className="text-justify">
                                <a href={`/ylmy-tejribe/${perman?.pdf?.match(/\/pdf\/(\d+)\.pdf/)?.[1]}`} className="hover:underline">
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
            )}
          </>
      }
      </main>
    </div>
  )
}

export default AllCotegory