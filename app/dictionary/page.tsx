"use client"
import * as React from 'react';

import { Separator } from "@/components/ui/separator"
import SearchBar from '@/components/SearchBar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const page = () => {
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
            <SearchBar />
          </div>
          <div className='flex flex-col'>
            <p className='font-roboto_medium mb-1'>Türkmençe</p>
            <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
              HARBY JENAÝATLAR
            </div>
          </div>
          <div>
            <p className='font-roboto_medium mb-1'>
              Русский
            </p>
            <div className="border-gray-300 text-[15px] border-[1px] rounded-lg p-2 font-roboto_medium">
             ВОЕННЫЕ ПРЕСТУПЛЕНИЯ
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:w-[28%]'>
            <p className='font-semibold mb-2'>
              HARBY JENAÝATLAR
            </p>
            <p className="text-justify">
              (halkara jenaýat) - uruş kanunlarynyň ýa-da däpleriniň şahsy jenaýat jogapkärçiligine geçirýän bozulmalary. 1998-nji 17-nji iýulyndaky Halkara jenaýat kazyýetiniň Rim statuty (8-nji madda) harby jenaýatlaryň giň kesgitlemesini özünde saklaýar, onda halkara şertnamalaryndan we halkara adat hukugyndan gelip çykýan 50 jenaýatyň sanawy saklanýar. Rim statutyna laýyklykda, harby jenaýatlara mysal üçin, Ženewa konwensiýalarynyň ýa-da halkara ýaragly dawalarda ulanylýan kanunlaryň ýa-da däpleriň düýpli bozulmagy, ýagny bilkastlaýyn adam öldürmek, gynamalar we birehim çemeleşmek, adamlary girew almak, harby däl ilata bilkastlaýyn çozmak, edil şonuň ýaly hem goragsyz we harby nyşana bolmadyk şäherleri, obalary ýa-da jaýlary bombalamak, boýyn egýän kombatantlary öldürmek ýa-da ýaralamak we ş.m degişlidir.
            </p>
        </div>
        <div className='flex flex-col lg:w-[28%]'>
          <p className="font-semibold mb-2">
            ВОЕННЫЕ ПРЕСТУПЛЕНИЯ
          </p>
          <p className ="text-justify">
          (международное преступление) - Нарушения законов или обычаев войны, которые делают отдельных лиц преступниками. Римский статут Международного уголовного суда от 17 июля 1998 г. (статья 8) содержит широкое определение военных преступлений, включающее 50 преступлений, вытекающих из международных договоров и обычного международного права. Согласно Римскому статуту, преступления включают, например, серьезные нарушения Женевских конвенций или законов или конвенций, применимых к международным вооруженным конфликтам, такие как умышленное убийство, пытки и бесчеловечное обращение, захват заложников, умышленное причинение вреда некомбатантам и т. д. . включает бомбардировку незащищенных и невоенных объектов, городов, деревень или домов, убийство или ранение сдающихся комбатантов и т. д.
          </p>
        </div>
      </div>
    </div>
)
}

export default page