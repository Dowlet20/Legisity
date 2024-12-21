import * as React from "react"
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SearchBar from "../components/SearchBar"
 
import { SidebarTrigger } from "../components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator"

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


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <nav className="border-b-[1px] border-gray-300 flex items-center justify-between pl-2 w-full">
        <SidebarTrigger />
        <div className="mr-4 my-2">
          <ModeToggle />
        </div>
      </nav>
      <main className="w-[95%]">
        <section className="flex items-center mx-3 mt-[50px] gap-5">
          <SearchBar />
          <div className="w-full">
            <Select>
              <SelectTrigger className="text-[18px] flex-1">
                <SelectValue  placeholder="Namanyň görnüşini saýlaň" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-[18px]">Namanyň görnüşi</SelectLabel>
                  <SelectItem className="text-[18px]" value="apple">Apple</SelectItem>
                  <SelectItem className="text-[18px]" value="banana">Banana</SelectItem>
                  <SelectItem className="text-[18px]" value="blueberry">Blueberry</SelectItem>
                  <SelectItem className="text-[18px]" value="grapes">Grapes</SelectItem>
                  <SelectItem className="text-[18px]" value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
        
        <section className="mt-[30px] border-[1px] m-3 rounded-md">
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
                {kanunlar.map((invoice) => (
                  <TableRow key={invoice.number}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>{invoice.ID}</TableCell>
                    <TableCell>{invoice.Ady}</TableCell>
                    <TableCell>{invoice.month}</TableCell>
                    <TableCell>{invoice.year}</TableCell>
                    <TableCell>{invoice.Belgisi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Separator />
          <div className="p-2">
            <Pagination>
              <PaginationContent >
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-[18px]" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-[18px]">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-[18px]" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="text-[18px]" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  );
}
