import * as React from "react"
 
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
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
]


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-300 w-full h-[250px]">
        s
      </section>
      <section className="flex items-center mx-3 mt-[20px] gap-5">
        <input placeholder="Gözleg" className="flex-1 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1" />
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Namanyň görnüşini saýlaň" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Namanyň görnüşi</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      
      <section className="mt-[20px] border-[1px] m-3 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">N=</TableHead>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="text-center">Ady</TableHead>
              <TableHead className="w-[50px]">Aýy</TableHead>
              <TableHead className="w-[50px]">Ýyly</TableHead>
              <TableHead className="w-[90px]">Belgisi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
      </section>
    </div>
  );
}
