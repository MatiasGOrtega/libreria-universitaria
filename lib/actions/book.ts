"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, like, sql } from "drizzle-orm";
import daysjs from "dayjs";
import { ITEM_PER_PAGE } from "@/constants";

export async function borrowBook(params: BorrowBookParams) {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = daysjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
}

interface BooksProps {
  offsetItems: number;
  searchQuery: string;
}

//action to get books by pagination
export async function getBooks({ offsetItems, searchQuery }: BooksProps) {
  try {
    const allBooks = await db
      .select()
      .from(books)
      .limit(ITEM_PER_PAGE)
      .offset(offsetItems)
      .where(like(books.title, `%${searchQuery}%`));

    return {
      books: allBooks,
    }

  } catch (error) {
    console.log(error);

    return {
      books: [],
    };
  }
}

interface TotalBooksProps {
  searchQuery: string;
}

export async function getTotalBooks({ searchQuery }: TotalBooksProps) {
  try {
    const totalBooks = await db
      .select({ count: sql<number>`count(*)` })
      .from(books)
      .where(like(books.title, `%${searchQuery}%`));

    const totalCount = totalBooks[0].count;

    return totalCount;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
