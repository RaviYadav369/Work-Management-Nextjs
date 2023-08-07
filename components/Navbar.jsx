"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter()
  const sign =()=>{
    router.push('/login')
  }

  // console.log(session);
  return (
    <section className="w-full">
      <nav className="w-3/4 mx-auto flex justify-between">
        <Link href="/">
          <p className="text-2xl font-satoshi font-semibold">Work Management</p>
        </Link>
        <div className="flex p-3 ">
        { session?.user && session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={`/user?id=${session?.user.getUser ? session?.user.getUser._id : session.user.id}`}  >
              {session?.user.getUser ? session?.user.getUser.userName : session.user.name}
            </Link>
            <button type="button" onClick={()=>signOut()} className="outline_btn">
              Sign Out
            </button>
              
          </div>
        ) : (
          <>
            <button type="button" onClick={sign} className="black_btn">
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
