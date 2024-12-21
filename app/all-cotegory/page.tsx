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

import axiosInstance, { base_URL } from "@/utils/axiosInstance";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SearchBar from "../../components/SearchBar"
 
import { SidebarTrigger } from "../../components/ui/sidebar";
import Link from "next/link";

const kanunlar = [
  {
    number: "1",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "2",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "3",
    ID: "25791",
    Ady: "Ölüm jezasyny jenaýat jeza çäresi hökmünde ulanmaga moratoriý girizmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "4",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "5",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "6",
    ID: "25791",
    Ady: "Betnebisçilikli jenaýatlar üçin öň jenaýat jogapkärçiligine çekilen we iş kesilen adamlary maddy jogapkärçilik bilen baglanyşykly işe (gulluga) kabul etmegi gadagan etmek hakynda",
    month:"Oktýabr",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "7",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "8",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "9",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "10",
    ID: "25791",
    Ady: "Ölüm jezasyny jenaýat jeza çäresi hökmünde ulanmaga moratoriý girizmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "11",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "12",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "13",
    ID: "25791",
    Ady: "Betnebisçilikli jenaýatlar üçin öň jenaýat jogapkärçiligine çekilen we iş kesilen adamlary maddy jogapkärçilik bilen baglanyşykly işe (gulluga) kabul etmegi gadagan etmek hakynda",
    month:"Oktýabr",
    year:"2017",
    Belgisi: "PP-125",
  },
  {
    number: "14",
    ID: "25791",
    Ady: "Türkmenistanyň Ykdysady jenaýatlara garşy göreşmek baradaky döwlet gullugyny döretmek hakynda",
    month:"Iýun",
    year:"2017",
    Belgisi: "PP-125",
  },
]


const AllCotegory = () => {
  const [kodeksler, setKodeksler] = useState<any>([]);
  const [namalar, setNamalar] = useState<any>([]);
  const [permanlar, setPermanlar] = useState<any>([])
  const [selectedKodeks, setSelectedKodeks] = useState("Namanyň görnüşini saýlaň");
  const [selectedNama, setSelectedNama] = useState("Namany saýlaň");
  const [selectedPerman, setSelectedPerman] = useState("");


  console.log(kodeksler);
  console.log(namalar)
  console.log(selectedNama)
  console.log(permanlar)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${base_URL}/api/get-kodeks`);
        setKodeksler(response.data);

      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${base_URL}/api/get-namalar?id=${selectedKodeks}`);
        setNamalar(response.data);

      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [selectedKodeks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${base_URL}/api/get-permanlar/${selectedNama}`);
        setPermanlar(response.data);

      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [selectedNama]);
  

  const handleSelectKodeks = (value: string) => {
    setSelectedKodeks(value);
  }

  const handleSelectNama = (value: string) => {
    setSelectedNama(value);
  }


  return (
    <div className="flex flex-col items-center">
      <nav className="border-b-[1px] border-gray-300 flex items-center justify-between pl-2 w-full">
        <SidebarTrigger />
        <div className="mr-4 my-2">
          <ModeToggle />
        </div>
      </nav>
      <main className="w-[95%]">
        <section className="flex items-center mx-3 mt-[40px] gap-5">
          <div className="w-full">
            <Select onValueChange={handleSelectKodeks}>
              <SelectTrigger className="text-[18px] flex-1">
                <SelectValue  placeholder="Namanyň görnüşini saýlaň" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[18px]">Namanyň görnüşi</SelectLabel>
                  {kodeksler?.map((nama: any)=> {
                    return (
                    < SelectItem
                      key={nama?.id} 
                      className="text-[18px]" 
                      value={nama?.id}
                    >
                      {nama.title_tm}
                    </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SearchBar />
        </section>
        <section className="flex items-center mx-3 mt-[30px] gap-5">
          <div className="w-full">
            <Select onValueChange={handleSelectNama}>
              <SelectTrigger className="text-[18px] flex-1">
                <SelectValue  placeholder="Namany saýlaň" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[18px]">Namanyň görnüşi</SelectLabel>
                  {namalar?.map((nama: any) => {
                    return (
                    <SelectItem
                      key={nama?.id} 
                      className="text-[18px]" 
                      value={nama?.id}
                    >
                      {nama.title_tm}
                    </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="flex items-center w-full gap-5">
            <div className="w-full">
              <Select>
                <SelectTrigger className="text-[18px] flex-1">
                  <SelectValue  placeholder="Namanyň görnüşini saýlaň" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[18px]">Namanyň görnüşi</SelectLabel>
                    {kodeksler?.map((nama: any)=> {
                      return (
                      < SelectItem
                        key={nama?.id} 
                        className="text-[18px]" 
                        value={nama?.id}
                      >
                        {nama.title_tm}
                      </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select>
                <SelectTrigger className="text-[18px] flex-1">
                  <SelectValue  placeholder="Namanyň görnüşini saýlaň" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[18px]">Namanyň görnüşi</SelectLabel>
                    {kodeksler?.map((nama: any)=> {
                      return (
                      < SelectItem
                        key={nama?.id} 
                        className="text-[18px]" 
                        value={nama?.id}
                      >
                        {nama.title_tm}
                      </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div> */}
        </section>
        <section className="mt-[40px] border-[1px] m-3 rounded-md">
          <div className="border-gray-300 border-b-[1px]">
            <Table>
              <TableHeader className="text-[18px]">
                <TableRow>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">N=</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">ID</TableHead>
                  <TableHead className="text-center font-roboto_medium text-gray-800">Ady</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">Aýy</TableHead>
                  <TableHead className="w-[50px] font-roboto_medium text-gray-800">Ýyly</TableHead>
                  <TableHead className="w-[90px] font-roboto_medium text-gray-800">Belgisi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-[18px]">
                {permanlar.length === 0 ? "" : permanlar.map((perman: any) => (
                  <TableRow key={perman?.id}>
                    <TableCell className="font-medium">{perman?.id}</TableCell>
                    <TableCell>{perman?.id}</TableCell>
                    <TableCell>
                      <a href={`/perman/${perman?.id}`}  className="text-blue-600 hover:underline">
                        {perman?.title_tm}
                      </a>
                    </TableCell>
                    <TableCell>{perman?.year}</TableCell>
                    <TableCell>{perman?.year}</TableCell>
                    <TableCell>{perman?.number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-2">
           
          </div>
        </section>
      </main>
    </div>
  )
}

export default AllCotegory