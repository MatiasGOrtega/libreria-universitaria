"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

import { borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

function BorrowBook({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Exito!", {
          description: "El libro ha sido prestado con éxito",
        });

        router.push("/");
      } else {
        toast.error("Error", {
          description: result.error,
        });
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Error", {
        description: "Hubo un error al intentar pedir prestado el libro",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Prestando ..." : "Pedir prestado"}
      </p>
    </Button>
  );
}

export default BorrowBook;
