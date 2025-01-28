"use client"
"use strict"
import {useEffect, useState, use} from 'react'
import * as React from "react";
import { useTheme } from 'next-themes';

import { pdfjs } from 'react-pdf';
import PdfCot from '../../../components/pdfCot';
import { useMyContext } from '@/context/mycontext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Perman = ({ params }: { params: Promise<{ id: string }> }) => {
  const {id} = use(params);
  const {theme} = useTheme();
  const {change} = useMyContext();


  useEffect(()=>{}, [theme])
  
  return (
    <div className='flex flex-col items-center'>
      <PdfCot
        bookUrl={id} 
      />
    </div>
  )
}

export default Perman