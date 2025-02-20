"use client"
import { base_URL } from '@/utils/axiosInstance';
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp( {bookUrl}: any ) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const originalWidth =820;
  const [windowWidth, setWindowWidth] = useState<number>(0); 
  const [scale, setScale] = useState(1.22);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      setScale(1.22 * (windowWidth/originalWidth))

    }
  }, [windowWidth]);
  
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  
  console.log(`${base_URL}${bookUrl}`)
  
  return (
    <div className='flex flex-col'>
      <div className="flex justify-center w-full">
        {bookUrl ? <Document file={`${base_URL}${bookUrl}`} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-2" > 
              <Page 
                pageNumber={index + 1} 
                scale={scale}
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