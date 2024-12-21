"use client"

import axiosInstance, { base_URL } from '@/utils/axiosInstance';
import {useEffect, useState, use} from 'react'
import * as React from "react"
import {ModeToggle} from "@/components/toggleButton";


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
 
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator"


import { pdfjs } from 'react-pdf';
import PdfComp from '../../../components/PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Perman = ({ params }: { params: Promise<{ id: string }> }) => {
  const [perman, setPerman] = useState<any>({});
  const {id} = use(params);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${base_URL}/api/perman/get_one/${id}`);
        
        setPerman(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
 
  console.log(perman?.pdf)
  return (
    <div className='flex flex-col items-center mt-[20px]'>
      <div className="border-gray-300 border-[1px] rounded-md w-[84%]">
        <Table>
          <TableHeader className="text-[18px] bg-gray-100">
            <TableRow>
              <TableHead className="font-roboto_medium text-gray-800">ID</TableHead>
              <TableHead className="font-roboto_medium text-gray-800">Belgisi</TableHead>
              <TableHead className="font-roboto_medium text-gray-800">Bendi</TableHead>
              <TableHead className="font-roboto_medium text-gray-800">Aýy</TableHead>
              <TableHead className="font-roboto_medium text-gray-800">Ýyly</TableHead>
              <TableHead className="font-roboto_medium text-gray-800">Güni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[18px]">
            <TableRow key={"1"}>
              <TableCell>{perman?.id}</TableCell>
              <TableCell>{perman?.number}</TableCell>
              <TableCell></TableCell>
              <TableCell>{perman?.month}</TableCell>
              <TableCell>{perman?.year}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <PdfComp 
        bookUrl={perman?.pdf} 
      />
    </div>
  )
}

export default Perman