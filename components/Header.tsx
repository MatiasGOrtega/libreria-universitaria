import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

function Header({ session }: Readonly<HeaderProps>) {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex flex-row justify-center items-center gap-3">
        <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
        <h1 className="text-2xl font-semibold text-white">BookPapulo</h1>
      </Link>

      <ul className="flex items-center gap-8">
        <li className="flex gap-2">
          <Link href="/" className="flex flex-row justify-center items-center gap-3">
            <Image src="/icons/home.svg" alt="logo" width={20} height={20} />
            <p className="block max-md:hidden font-semibold text-light-200">Inicio</p>
          </Link>
        </li>
        <li className="flex gap-2">
          <Link href="/search" className="flex flex-row justify-center items-center gap-3">
            <Image src="/icons/search-fill.svg" alt="book" width={20} height={20} />
            <p className="block max-md:hidden font-semibold text-light-200">Buscar</p>
          </Link>
        </li>
        <li className="flex gap-2">
          <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitials(session?.user?.name ?? "IN")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-light-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        </li>
        <li className="flex gap-2 items-center">
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button className="bg-dark-500 p-2 hover:bg-red-200">
              <Image src="/icons/logout.svg" alt="book" width={20} height={20} />
            </Button>
          </form>
        </li>
      </ul>
    </header>
  );
}

export default Header;
