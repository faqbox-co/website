import Link from "next/link";
import Image from "next/image";
import LogoText from "../assets/faqbocs-favicon.png";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactElement }) {
  const { status } = useSession();
  return (
    <>
      <nav className="bg-white fixed z-10 h-[70px] 2xl:h-[80px]  shadow-md top-0 left-0 flex justify-between w-[100vw] ">
        <div className="w-full max-w-7xl m-auto flex justify-between px-5 sm:px-28 items-center">
          <div className="flex gap-2 items-center">
            <a
              href={"/"}
              className=" relative flex justify-center items-center gap-2"
            >
              <Image src={LogoText} alt="faqbocs" height={45} />
              <p className=" text-2xl sm:text-3xl font-bold align-middle font-ssp ">
                Faqbocs
              </p>
            </a>
            <Link
              href={"/start"}
              className="py-2 px-4 ml-6 hover:bg-gray-100 rounded-xl hidden lg:inline-block transition"
            >
              <p className=" text-lg font-semibold">Guides</p>
            </Link>
            <a
              href={"/about"}
              className="py-2 px-4 hover:bg-gray-100 rounded-xl hidden lg:inline-block transition"
            >
              <p className=" text-lg font-semibold">About</p>
            </a>
            <a
              href={"/question"}
              className="py-2 px-4 hover:bg-gray-100 rounded-xl hidden lg:inline-block transition"
            >
              <p className=" text-lg font-semibold">Questions?</p>
            </a>
          </div>
          <Link
            className=" font-semibold py-3 px-4 2xl:py-4 2xl:px-6 font-poppins rounded-full bg-gray-200 hover:text-white w-fit align-middle transition duration-300 hover:bg-slate-900"
            href={
              status === "loading"
                ? "#"
                : status === "authenticated"
                ? "/admin"
                : "/auth/login"
            }
          >
            {status === "loading"
              ? "Loading..."
              : status === "authenticated"
              ? "Go to dashboard"
              : "Sign up free"}
          </Link>
        </div>
      </nav>
      {children}
      <div className="min-h-[100vh] flex flex-col 2xl:min-h-[800px] bg-slate-900">
        <div className="m-auto max-w-7xl px-5 sm:px-28 mx-auto flex flex-col text-center sm:py-28 pt-24 pb-16">
          <h1 className="font-ssp text-5xl sm:text-6xl mb-8 font-black text-white">
            Start creating your Faqbocs today!
          </h1>
          <h1 className="font-ssp sm:text-4xl text-3xl mb-8 font-semibold text-white">
            Let them know more. Less confusion.
          </h1>
          <Link
            className="text-xl sm:text-2xl mx-auto font-semibold py-4 px-8 rounded-full bg-blue-600 text-white w-fit align-middle mt-4 shadow-lg hover:scale-105 transition duration-300"
            href={"/admin"}
          >
            Create your Faqbocs
          </Link>
        </div>
        <div className="m-auto min-h-[200px] py-10 w-full max-w-7xl px-5 sm:px-28 2xl:px-0 mx-auto font-ssp">
          <div className="  w-full text-lg font-medium">
            <div className="w-full grid sm:grid-cols-3 bg-white rounded-2xl grid-cols-1 p-8 sm:p-16 gap-5 sm:gap-0 text-slate-600">
              <div className="flex flex-col sm:gap-3 gap-1">
                <h1 className="text-2xl font-bold text-slate-900">About</h1>
                <Link href={"/about"}>About us</Link>
                <Link href={"/contact"}>Contact</Link>
              </div>
              <div className="flex flex-col sm:gap-3 gap-1">
                <h1 className="text-2xl font-bold text-slate-900">Support</h1>
                <Link href={"/start"}>Getting Started</Link>
                <Link href={"/faqbocs"}>FAQs</Link>
                <Link
                  target="_blank"
                  href={"https://forms.gle/bfhB46b9zA7MCft88"}
                >
                  Report Issue
                </Link>
              </div>
              <div className="flex flex-col sm:gap-3 gap-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  Term & Policy
                </h1>
                <Link href={"/terms"}>Terms & Conditons</Link>
                <Link href={"/privacy"}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
