'use client';

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

interface NotBookFoundProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}

function NotBookFound({ searchParams }: Readonly<NotBookFoundProps>) {

  const router = useRouter();

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete("q");
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex justify-center items-center flex-col text-center w-full">
      <Image src="/images/no-books.png" alt="empty" width={200} height={200} />
      <h4 className='text-white mt-6 font-semibold text-2xl'>
        No se encontraron libros.
      </h4>
      <p className='text-light-100 w-[360px] mt-1'>
        No encontramos ningún libro que coincida con tu búsqueda. Prueba con otras palabras clave o revisa si hay errores tipográficos.
      </p>
      <Button
        onClick={clearSearch}
        className='bg-primary font-bebas-neue min-w-[360px] mt-6 text-dark-100 text-xl hover:bg-primary/90 min-h-12'>
        Limpiar búsqueda
      </Button>
    </div>
  )
}

export default NotBookFound