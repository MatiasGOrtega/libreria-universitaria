import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import React from 'react'

function Page() {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <span className='text-lg text-light-100 font-semibold leading-7 tracking-widest'>DESCUBRA SU PRÓXIMA GRAN LECTURA:</span>
        <h1 className='text-6xl text-light-300 font-semibold leading-16'>Explora y busca <span className='text-light-200'>cualquier libro</span> en nuestra biblioteca</h1>
        <form>
          <div className='search'>
            <Image src="/icons/search-fill.svg" alt="book" width={20} height={20} />
            <Input
              type="text"
              placeholder="Buscar libros..."
              className="w-2xl search-input"
              name="search"
              id="search"
              required
            />
          </div>
        </form>
      </div>
      {/*  Books searched  */}
      <div className='mt-10 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl text-light-100 font-semibold leading-10 tracking-widest'>Resultados de búsqueda</h2>
          <div className='flex items-center justify-center gap-2 bg-dark-300 text-light-100 border-dark-100 px-4 py-2.5 rounded-lg'>
            <p className='text-light-100'>Filtra por: </p>
            <Select>
              <SelectTrigger className="w-[180px] select-trigger border-none">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent className='select-content border-none'>
                <SelectGroup className='border-none'>
                  <SelectLabel>Libros</SelectLabel>
                  <SelectItem className='select-item' value="department">
                    Departamento
                  </SelectItem>
                  <SelectItem className='select-item' value="author">
                    Autor
                  </SelectItem>
                  <SelectItem className='select-item' value="title">
                    Título
                  </SelectItem>
                  <SelectItem className='select-item' value="genre">
                    Género
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {/* Book card */}
          <div className='bg-light-200 rounded-lg p-4'>
            <Image src="/images/book-cover.jpg" alt="book" width={150} height={200} className='rounded-lg' />
            <h3 className='text-xl text-light-300 font-semibold'>Título del libro</h3>
            <p className='text-light-100'>Autor del libro</p>
          </div>
          {/* Repeat for more books */}
        </div>
      </div>
    </>
  )
}

export default Page