"use client"
import {useState, useEffect } from 'react';
import Select from 'react-select/async';

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from '@/components/ui/sidebar';
import axiosInstance, { base_URL } from '@/utils/axiosInstance';
import { useMyContext } from '@/context/mycontext';

const page = () => {
    const [word, setWord] = useState<any>({});
    const {change} = useMyContext();
    const [windowWidth, setWindowWidth] = useState<number>(0); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      
      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

    const loadOptions = async (query:string) => {
      const url = !query 
              ? `${base_URL}/api/get-dictinary` 
              : `${base_URL}/api/get-dictinary?search=${query}`;
      try {
        const response = await axiosInstance.get(url);
        return response.data.map((item:any) => ({
          label: change ? item.title_tm : item.title_ru,
          value: item.id,
          word:item
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };
  
    const handleChange = (option:any) => {
      setWord(option.word);
    };


  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className="ml-[10px]">
        {windowWidth < 1300 ? (<SidebarTrigger />) : (<div></div>)} 
        </div>
        <p className='text-[20px] my-[10px] font-roboto_medium'>
          Hukuk sözlügi
        </p>
        <p></p>        
      </div>
      <Separator />
      <div 
        className={`flex flex-col ${Object.keys(word).length === 0 ? "items-center" :"lg:flex-row"}  
        items-start justify-around mt-[75px] mx-[40px]`}
      >
        <div className={`flex flex-col w-full ${Object.keys(word).length === 0 ? "lg:w-[50%]" :"lg:w-[28%]"} gap-4 mb-4`}>
          <div className='flex w-full'>
            <div className='relative w-full'>
              <Select
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleChange}
                value={word?.id || ""}
                placeholder="Gözleg... "
              />
            </div>
          </div>
          {Object.keys(word).length !== 0 && (
            <>
              <div className='flex flex-col'>
                <p className='font-roboto_medium mb-1'>Türkmençe</p>
                <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
                  {word?.title_tm}
                </div>
              </div>
              <div>
                <p className='font-roboto_medium mb-1'>
                  Русский
                </p>
                <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
                  {word?.title_ru}
                </div>
              </div>
            </>
          )}
        </div>
        <div className='flex flex-col lg:w-[28%]  max-xl:mt-[20px]'>
            <p className='font-semibold mb-2'>
              {word?.title_tm}
            </p>
            <p className="text-justify mt-[5px]">
              {word?.description_tm}
            </p>
        </div>
        <div className='flex flex-col lg:w-[28%] max-xl:mt-[30px]'>
          <p className="font-semibold mb-2">
            {word?.title_ru}
          </p>
          <p className ="text-justify mt-[5px]">
            {word?.description_ru}
          </p>
        </div>
      </div>
    </div>
)
}

export default page