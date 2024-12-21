"use client"
import { base_URL } from '@/utils/axiosInstance';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';

function PdfComp( {bookUrl}: any ) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const originalWidth =820;
  const scale = 0.9 * (window.innerWidth/originalWidth)
  const [zoom, setZoom] = useState<number>(scale);

  console.log(bookUrl)
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }


  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 3.5)); 
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  // file={`${base_URL}${bookUrl}`}
  return (
    <div className='flex flex-col'>
      <div className="flex items-center self-center w-[144px] my-4 space-x-4 border-[1px] rounded-md">
            <button 
                onClick={handleZoomOut} 
                className="px-3 py-2 transition duration-200 border-r-[1px]"
            >
                <Minus size={16} className="text-black" />
            </button>
            <span className="text-[18px] font-semibold">{zoom.toFixed(1)}</span>
            <button 
                onClick={handleZoomIn} 
                className="px-3 py-2 transition duration-200 border-l-[1px]"
            >
                <Plus size={16} className="text-black" />
            </button>
        </div>
      <div className="flex justify-center w-full">
        {bookUrl ? <Document file={`${base_URL}${bookUrl}`} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-2" > 
              <Page 
                pageNumber={index + 1} 
                scale={zoom}
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
              />
            </div>
          ))}
        </Document> : <p>Loading</p>}
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfComp;