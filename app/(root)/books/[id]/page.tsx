import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface Book {
  id: string;
}


async function Page({ params }: Readonly<{ params: Promise<Book> }>) {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Resumen</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={id+i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/*  SIMILAR*/}
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Libros similares</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl font-semibold text-light-100">
                  Libros de la misma categoría
                </h4>
                <div className="flex flex-col gap-5">
                  {/* <BookList title="Libros de la misma categoría" books={books} /> */}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-2xl font-semibold text-light-100">
                  Libros de la misma editorial
                </h4>
                <div className="flex flex-col gap-5">
                  {/* <BookList title="Libros de la misma editorial" books={books} /> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
