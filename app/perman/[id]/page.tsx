"use client"

import axiosInstance, { base_URL } from '@/utils/axiosInstance';
import {useEffect, useState, use} from 'react'
import * as React from "react"
import {ModeToggle} from "@/components/toggleButton";
import { useTheme } from 'next-themes';

// global.d.ts
interface PromiseConstructor {
  withResolvers<T>(): { promise: Promise<T>; resolve: (value?: T | PromiseLike<T>) => void; reject: (reason?: any) => void; };
}

// Ensure to include this file in your TypeScript compilation

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


const Perman = ({ params }: { params: Promise<{ id: string }> }) => {
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
  }, []);

  useEffect(()=>{}, [theme])
  return (
    <div className='flex flex-col items-center'>
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
      <div className=" border-[1px] rounded-md w-[84%] mb-4">
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