"use client"
import {useState, useEffect, ChangeEvent} from 'react';

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from '@/components/ui/sidebar';
import axiosInstance, { base_URL } from '@/utils/axiosInstance';
import { useMyContext } from '@/context/mycontext';

const page = () => {
  const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [data, setData] = useState<string[]>([]);
    const [word, setWord] = useState<any>({});
    const {change} = useMyContext();
    


    useEffect(
      ()=> {
        const fetchData = async () => {
          try {
            const url = !query 
              ? `${base_URL}/api/get-dictinary` 
              : `${base_URL}/api/get-dictinary?search=${query}`;
              
            const response = await axiosInstance.get(url);
            setData(response.data);
            
          } catch (error:any) {
            if (error.response) {
              throw new Error(`HTTP error! status: ${error.response.status}`);
            } else if (error.request) {
              throw new Error('No response received from the server');
            } else {
              throw new Error(`Error: ${error.message}`);
            }
          }
        };
        fetchData();
      }, [query]);


    // const data: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            // const filteredSuggestions = data.filter(item =>
            //     item.toLowerCase().includes(value.toLowerCase())
            // );
            //setSuggestions(filteredSuggestions);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        setQuery(change ? suggestion?.title_tm : suggestion?.title_ru);
        setWord(suggestion);
        setShowDropdown(false);
    };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className="ml-[10px]">
          <SidebarTrigger />
        </div>
        <p className='text-[20px] my-[10px] font-roboto_medium'>
          Hukuk sözlügi
        </p>
        <p></p>        
      </div>
      <Separator />
      <div className='flex flex-col xl:flex-row items-start justify-around mt-[75px] mx-[40px]'>
        <div className='flex flex-col w-full lg:w-[28%] gap-4 mb-4'>
          <div className='flex w-ful'>
            <div className="relative w-full">
              <input
                  type="text"
                  value={query || ''}
                  onChange={handleChange}
                  //onBlur={() => setShowDropdown(false)}
                  onFocus={() => query && setShowDropdown(true)}
                  className="w-full p-1 border text-[16px] border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none"
                  placeholder="Gözleg..."
              />
              {showDropdown && data.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                      {data.map((item: any, index) => (
                          <button
                              key={index}
                              onClick={() => handleSuggestionClick(item)}
                              className="p-2 hover:bg-gray-200 cursor-pointer block w-full"
                          >
                              {change ? item?.title_tm : item?.title_ru}
                          </button>
                      ))}
                  </div>
                )}
            </div>
          </div>
          {Object.keys(word).length !== 0 && (
            <>
              <div className='flex flex-col'>
                <p className='font-roboto_medium mb-1'>Türkmençe</p>
                <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
                  {'' || word?.title_tm}
                </div>
              </div>
              <div>
                <p className='font-roboto_medium mb-1'>
                  Русский
                </p>
                <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
                  {'' || word?.title_ru}
                </div>
              </div>
            </>
          )}
        </div>
        <div className='flex flex-col lg:w-[28%]  max-xl:mt-[20px]'>
            <p className='font-semibold mb-2'>
              {'' || word?.title_tm}
            </p>
            <p className="text-justify mt-[5px]">
              {'' || word?.description_tm}
            </p>
        </div>
        <div className='flex flex-col lg:w-[28%] max-xl:mt-[30px]'>
          <p className="font-semibold mb-2">
            {'' || word?.title_ru}
          </p>
          <p className ="text-justify mt-[5px]">
            {'' || word?.description_ru}
          </p>
        </div>
      </div>
    </div>
)
}

export default page