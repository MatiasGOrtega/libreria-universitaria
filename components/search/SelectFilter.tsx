'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  handleSelectChange: (value: string) => void
}

function SelectFilter({ handleSelectChange }: Readonly<Props>) {
  return (
    <div className='flex items-center justify-center gap-2 bg-dark-300 text-light-100 border-dark-100 px-4 py-2.5 rounded-lg'>
      <p className='text-light-100'>Filtra por: </p>
      <Select onValueChange={handleSelectChange} defaultValue="rating">
        <SelectTrigger className="w-[180px] select-trigger border-none">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent className='select-content border-none'>
          <SelectGroup className='border-none'>
            <SelectLabel>Libros</SelectLabel>
            <SelectItem className='select-item' value="rating">
              Calificación
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
  )
}

export default SelectFilter