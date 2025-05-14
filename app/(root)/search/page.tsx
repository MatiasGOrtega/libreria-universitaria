import BookList from '@/components/BookList'
import PaginationBooks from '@/components/PaginationBooks';
import NotBookFound from '@/components/search/NotBookFound';
import Search from '@/components/search/Search';
// import SelectFilter from '@/components/search/SelectFilter';
import { ITEM_PER_PAGE } from '@/constants';
import { getBooks, getTotalBooks } from '@/lib/actions/book';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: Readonly<{ searchParams: SearchParams }>) {
  const { page, q, ...queryParamas } = await props.searchParams;
  const searchQuery = typeof q === "string" ? q : "";

  const pageNumber = Math.max(1, Number(page ?? 1));

  const totalCount = await getTotalBooks({ searchQuery });
  const numberOfPages = Math.max(1, Math.ceil(totalCount / ITEM_PER_PAGE));

  const safePageNumber = Math.min(pageNumber, numberOfPages);
  const offsetItems = (safePageNumber - 1) * ITEM_PER_PAGE;

  const { books } = await getBooks({ offsetItems, searchQuery })

  return (
    <>
      <div className='flex flex-col gap-2'>
        <span className='text-lg text-light-100 font-semibold leading-7 tracking-widest'>DESCUBRA SU PRÓXIMA GRAN LECTURA:</span>
        <h1 className='text-6xl text-light-300 font-semibold leading-16'>Explora y busca <span className='text-light-200'>cualquier libro</span> en nuestra biblioteca</h1>

        <Search search={searchQuery} />

      </div>
      {/*  Books searched  */}
      <div className='mt-10 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl text-light-100 font-semibold leading-10 tracking-widest'>Resultados de búsqueda</h2>
          {/* <SelectFilter handleSelectChange={handleSelectChange} /> */}
        </div>
        {/* Books list result */}
        {books.length > 0 ? (
          <>
            <BookList
              title=" "
              books={books}
              containerClassName="grid grid-cols-1 gap-4"
            />

            <PaginationBooks
              page={pageNumber}
              count={totalCount}
              numberOfPages={numberOfPages}
            />
          </>
        ) : (
          <NotBookFound searchParams={queryParamas} />
        )}
      </div>
    </>
  )
}

export default Page