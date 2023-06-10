import Layout from "@/components/Layout";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { GrInstagram } from "react-icons/gr";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact us | Faqbocs</title>
      </Head>
      <div className="w-full font-ssp h-fit max-w-7xl mx-auto mt-[70px] sm:mt-20 py-14 text-xl font-medium px-5 sm:px-28 flex flex-col">
        <h1 className=" sm:text-7xl text-5xl text-center font-black mb-5">
          Contact Us
        </h1>
        <h4 className="text-2xl font-semibold text-center">
          Need to contact Faqbocs? Here are some ways to reach Us out.
        </h4>
        <a
          href={"mailto:faqbocs@gmail.com"}
          target="_blank"
          className="py-4 px-6 w-52 justify-center text-white bg-red-600 text-xl font-semibold rounded-full flex gap-3 items-center mx-auto my-6 hover:scale-105 transition duration-300"
        >
          Email Us <HiOutlineMail className="text-3xl" />
        </a>
        <h4 className="text-2xl font-semibold text-center mb-6">
          Our creator Instagram:
        </h4>
        <Link
          href={"https://instagram.com/farisyahzani"}
          target="_blank"
          className="py-4 px-6 w-52 justify-center text-white bg-gradient-to-tr from-orange-600 to-violet-700 via-red-500 text-xl font-semibold rounded-full flex gap-3 items-center mx-auto mb-6 hover:scale-105 transition duration-300"
        >
          @farisyahzani <GrInstagram className="text-2xl" />
        </Link>
        <Link
          href={"https://instagram.com/ziprawan._"}
          target="_blank"
          className="py-4 px-6 w-52 justify-center text-white bg-gradient-to-tr from-orange-600 to-violet-700 via-red-500 text-xl font-semibold rounded-full flex gap-3 items-center mx-auto mb-6 hover:scale-105 transition duration-300"
        >
          @ziprawan._ <GrInstagram className="text-2xl" />
        </Link>
      </div>
    </>
  );
}

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
