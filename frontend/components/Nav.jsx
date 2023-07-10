"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconLogout,
  IconLogin,
  IconHome,
  IconFeather,
  IconPaw,
  IconCat,
  IconHeartPlus,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const tokenExpired = session?.user?.exp * 1000 < Date.now(); // Check if token has expired

    if (tokenExpired) {
      handleSignOut(); // Log out the user if the token has expired
    }
  }, [session]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" }); // Redirect to login page after sign-out
  };

  return (
    <nav className="flex-between w-full mb-4 sm:mb-12 bg-neutral-900 drop-shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center h-16">
        <Link href="/" className="flex gap-3 flex-center">
          <Image
            src="/logo.svg"
            height={40}
            width={40}
            className="object-contain ml-2 sm:ml-0"
            alt="Pawsome Logo"
          />
          <div className="flex flex-col inline-block">
            <h1 className="text-white flex items-center text-2xl text-yellow-400 font-medium">
              Pawsome
            </h1>
            <span className="text-white text-xs font-medium">
              Your Pet Adoption Center
            </span>
          </div>
        </Link>
        <div className="sm:flex mr-2 sm:mr-0">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-white border rounded-full px-4 py-2 flex gap-1 items-center hover:bg-white hover:text-black"
              >
                <IconLogout strokeWidth="1.5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 md:gap-5">
              <button
                onClick={() => signIn()}
                className="text-sm font-medium bg-yellow-400 rounded-full px-4 py-2 text-black hover:bg-yellow-500 flex gap-1 items-center"
              >
                <IconLogin strokeWidth="1.5" />
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      {session?.user && (
        <div className="bg-gray-200 w-full">
          <div className="container mx-auto">
            <ul className="flex flex-wrap justify-between font-medium text-black items-center sm:py-1">
              <li
                className={`items-center flex hover:bg-yellow-500 px-5 ${
                  pathname === "/" ? "bg-yellow-400" : ""
                } sm:w-auto sm:rounded-full sm: h-10 w-full sm:py-0 py-2`}
              >
                <Link href="/" className="text-base flex gap-1 items-center">
                  <IconHome strokeWidth={1.5} size={21} />
                  Home
                </Link>
              </li>
              <li
                className={`items-center flex hover:bg-yellow-500 px-5 ${
                  pathname === "/types" ? "bg-yellow-400" : ""
                } sm:w-auto sm:rounded-full sm: h-10 w-full sm:py-0 py-2`}
              >
                <Link
                  href="/types"
                  className="text-base flex gap-1 items-center"
                >
                  <IconFeather strokeWidth={1.5} size={21} />
                  Species
                </Link>
              </li>
              <li
                className={`items-center flex hover:bg-yellow-500 px-5 ${
                  pathname === "/breeds" ? "bg-yellow-400" : ""
                } sm:w-auto sm:rounded-full sm: h-10 w-full sm:py-0 py-2`}
              >
                <Link
                  href="/breeds"
                  className="text-base flex gap-1 items-center"
                >
                  <IconPaw strokeWidth={1.5} size={21} />
                  Breeds
                </Link>
              </li>
              <li
                className={`items-center flex hover:bg-yellow-500 px-5 ${
                  pathname === "/pets" ? "bg-yellow-400" : ""
                } sm:w-auto sm:rounded-full sm: h-10 w-full sm:py-0 py-2`}
              >
                <Link
                  href="/pets"
                  className="text-base flex gap-1 items-center"
                >
                  <IconCat strokeWidth={1.5} size={21} />
                  Pets
                </Link>
              </li>
              <li
                className={`items-center flex hover:bg-yellow-500 px-5 ${
                  pathname === "/requests" ? "bg-yellow-400" : ""
                } sm:w-auto sm:rounded-full sm: h-10 w-full sm:py-0 py-2`}
              >
                <Link
                  href="/requests"
                  className="text-base flex gap-1 items-center"
                >
                  <IconHeartPlus strokeWidth={1.5} size={21} />
                  Requests
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
