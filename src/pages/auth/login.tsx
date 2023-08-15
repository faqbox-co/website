import Head from "next/head";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import newUser from "../../assets/newuser-image.jpg";
import LogoText from "../../assets/logo-light.png";

export default function Login() {
  async function googleSignInHandler() {
    signIn("google", {
      callbackUrl: "/admin/",
    });
  }

  return (
    <>
      <Head>
        <title>Faqbocs</title>
        <meta
          name="description"
          content="A tool that allows you to create your own FAQ page with ease"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Faqbocs: Create your own FAQ page" />
        <meta property="og:url" content="https://faqbocs.com" />
        <meta property="og:image" content="https://faqbocs.com/card.png" />
        <meta name="twitter:image" content={`https://faqbocs.com/card.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <main className="font-ssp min-h-[100vh] grid sm:grid-cols-[_2fr_1fr] grid-cols-1 ">
        <Link
          href={"/"}
          className=" absolute top-0 left-0 p-12 w-full flex sm:justify-start justify-center items-center gap-2"
        >
          <Image src={LogoText} alt="faqbocs" height={40} />
          <p className="text-2xl font-semibold font-poppins align-middle">
            Faqbocs
          </p>
        </Link>
        <div className="min-h-[100vh] flex">
          <button
            className="m-auto px-6 py-4 font-ssp text-xl font-semibold bg-slate-200 rounded-lg flex gap-2 items-center shadow-md"
            onClick={googleSignInHandler}
          >
            Sign in with Google
            <FcGoogle className="text-4xl" />
          </button>
        </div>
        <div className="relative w-full h-full hidden sm:block">
          <Image
            alt="Bali, Indonesia"
            src={newUser}
            fill
            placeholder="blur"
            className="object-cover object-top"
          />
        </div>
      </main>
    </>
  );
}

export { default as getServerSideProps } from "@/utils/checkUname";
