"use client"
import { base_URL } from '@/utils/axiosInstance';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfCot( {bookUrl}: {bookUrl:string} ) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const originalWidth =820;
  const scale = 1.2 * (window.innerWidth/originalWidth)
  const [zoom, setZoom] = useState<number>(scale);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  console.log(`/pdf/${bookUrl}.pdf`);

  return (
    <div className='flex flex-col'>
      <div className="flex justify-center w-full">
        {bookUrl ? <Document file={`/pdf/${bookUrl}.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
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

export default PdfCot;