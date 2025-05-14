'use client';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

interface SearchProps {
  search: string | undefined;
}

function Search({ search }: Readonly<SearchProps>) {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    startTransition(() => {
      if (value) {
        router.push(`${pathname}/?q=${value}`);
      } else {
        router.push(`${pathname}`);
      }
      setIsLoading(false);
    });
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    debouncedSearch(event.target.value);
  };

  return (
    <div>
      <div className='search'>
        <Image src="/icons/search-fill.svg" alt="book" width={20} height={20} />
        <Input
          type="text"
          placeholder="Buscar libros..."
          className="w-2xl search-input"
          name="search"
          id="search"
          defaultValue={search}
          onChange={handleSearchChange}
          required
        />
      </div>

      {isLoading && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Loader2
            className="h-5 w-5 text-gray-400 animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export default Search