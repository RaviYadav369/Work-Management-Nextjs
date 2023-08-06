"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


const Navbar = () => {
  const { data: session } = useSession();

  // console.log(session);
  return (
    <section className="w-full">
      <nav className="w-3/4 mx-auto flex justify-between">
        <Link href="/">
          <p className="text-2xl font-satoshi font-semibold">Work Management</p>
        </Link>
        <div className="flex p-3 ">
        { session?.user.getUser && session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={`/user?id=${session?.user.getUser._id}`}  >
              {session?.user.getUser.userName}
            </Link>
            <button type="button" onClick={signOut()} className="outline_btn">
              Sign Out
            </button>
              
          </div>
        ) : (
          <>
            <button type="button" onClick={()=> signIn()} className="black_btn">
              Sign In
            </button>
          </>
        )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
