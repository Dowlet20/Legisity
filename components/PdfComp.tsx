"use client"
import { base_URL } from '@/utils/axiosInstance';
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

interface PdfCompProps {
  bookUrl: string;
}

const PdfComp: React.FC<PdfCompProps> = ({ bookUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const originalWidth = 820;
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.22);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScale(1.16 * (windowWidth / originalWidth));
    }
  }, [windowWidth]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  if (!bookUrl) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className="flex justify-center w-full">
        <Document 
          file={`${base_URL}${bookUrl}`} 
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Loading PDF...</p>}
          error={<p>Error loading PDF!</p>}
        >
          {numPages && Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-2"> 
              <Page 
                pageNumber={index + 1} 
                scale={scale}
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                loading={<p>Loading page...</p>}
                error={<p>Error loading page!</p>}
              />
            </div>
          ))}
        </Document>
      </div>
      {numPages && (
        <p className="text-center mt-4">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
}

export default PdfComp;