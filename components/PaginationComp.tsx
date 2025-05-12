import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

function PaginationComp({page, setPage} : any) {
  return (
    <Pagination className="pt-3 mb-2 border-t">
        <PaginationContent>
            <PaginationItem>
                {page!==1 && (<PaginationPrevious 
                href="#" 
                onClick={()=>{
                setPage((page:any)=> page-1)
                }}
            />)}
            </PaginationItem>
            {page>=2 && (
            <PaginationItem>
                <PaginationLink 
                href="#"
                onClick={()=> {
                    setPage((page:any)=>page-1)
                }}
                >
                {page-1}
                </PaginationLink>
            </PaginationItem>
            )}
            <PaginationItem>
                <PaginationLink 
                    className="bg-neutral-100 rounded-md"
                    href="#"
                    onClick={()=> {
                    setPage(page)
                    }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink 
                    href="#"
                    onClick={()=>{
                    setPage((page:any)=> page+1)
                    }}
                >
                    {page+1}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
                <PaginationNext 
                    href="#" 
                    onClick={()=>{
                        setPage((page:any)=> page+1)
                    }}
                />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
  )
}

export default PaginationComp
