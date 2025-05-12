"use client"

import axiosInstance, { base_URL } from '@/utils/axiosInstance';
import {useEffect, useState, use} from 'react'
import * as React from "react"
import {ModeToggle} from "@/components/toggleButton";
import { useTheme } from 'next-themes';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
import { SidebarTrigger } from "../../../components/ui/sidebar";
import Image from 'next/image';
import { pdfjs } from 'react-pdf';
import Link from 'next/link';
import PdfComp from '@/components/PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PermanProps {
  params: Promise<{ id: string }>;
}

const Perman: React.FC<PermanProps> = ({ params }) => {
  const [perman, setPerman] = useState<any>({});
  const {id} = use(params);
  const {theme} = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(0); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance?.get(`/api/perman/get_one/${id}`);
        setPerman(response?.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [id]);

  useEffect(()=>{}, [theme])
  
  return (
    <div className='flex flex-col items-center 2xl:ml-[200px]'>
      <nav className="border-b-[1px] border-gray-300 dark:border-gray-700 flex items-center justify-between pl-2 w-full mb-6 dark:bg-gray-950 bg-opacity-60 backdrop-blur-md sticky top-0 z-30">
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
      <div className="border-[1px] rounded-md w-[84%] mb-4">
        <Table>
          <TableHeader className="text-[16px] bg-gray-100 dark:bg-gray-900">
            <TableRow>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">ID</TableHead>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">Belgisi</TableHead>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">Bendi</TableHead>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">Aýy</TableHead>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">Ýyly</TableHead>
              <TableHead className="font-roboto_medium text-gray-800 dark:text-gray-100">Güni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[16px]">
            <TableRow key={"1"}>
              <TableCell>{perman?.id}</TableCell>
              <TableCell>{perman?.number}</TableCell>
              <TableCell></TableCell>
              <TableCell>{perman?.month}</TableCell>
              <TableCell>{perman?.year}</TableCell>
              <TableCell>{perman?.day}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {perman?.pdf && <PdfComp bookUrl={perman.pdf} />}
    </div>
  )
}

export default Perman