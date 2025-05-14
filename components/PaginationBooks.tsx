'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ITEM_PER_PAGE } from '@/constants'
import { generatePaginationArray } from '@/utils/generatePaginationArray'

interface PaginationProps {
  page: number;
  count: number;
  numberOfPages: number;
}

function PaginationBooks({ page, numberOfPages, count }: Readonly<PaginationProps>) {

  const isFirstPage = page === 1 ? page : page - 1;
  const isLastPage = page === Math.ceil(count / ITEM_PER_PAGE) ? page : page + 1;

  const paginationArray = generatePaginationArray(page, numberOfPages);

  return (
    <Pagination className='font-bebas-neue'>
      <PaginationContent>
        <PaginationItem>
          <Button asChild className='text-light-100 bg-dark-300 hover:bg-light-200 hover:text-dark-200'>
            <Link href={`?page=${isFirstPage}`}>&laquo;</Link>
          </Button>
        </PaginationItem>

        {paginationArray.map((item, index) => {
          const p = index + 1;
          return item === "..." ? (
            <span key={p} className="px-3 py-1">
              ...
            </span>
          ) : (
            <PaginationItem key={p}>
              <Button asChild disabled={p === page} className={`${p == page ? "bg-light-200 text-dark-200" : "text-light-100 bg-dark-300 hover:bg-light-200 hover:text-dark-200"}`}>
                <Link
                  key={p}
                  href={`?page=${item}`}
                >
                  {item}
                </Link>
              </Button>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <Button asChild className='text-light-100 bg-dark-300 hover:bg-light-200 hover:text-dark-200'>
            <Link href={`?page=${isLastPage}`}>&raquo;</Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationBooks;