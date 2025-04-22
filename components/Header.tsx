import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";

function Header({ session }: { session: Session }) {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li className="user">
          <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
}

export default Header;
