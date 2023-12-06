import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import landingPageFaqbocs from "../assets/landing-page-faqbocs.png";
import adminPageFaqbocs from "../assets/admin-page-faqbocs.png";
import shareImage from "../assets/share.jpg";
import Layout from "@/components/Layout";
import FAQhome from "@/components/FAQhome";
import { useSession } from "next-auth/react";

export default function Home() {
  const datafaq = [
    {
      id: "0",
      q: "What is FAQ Page?",
      a: "In simple terms, an FAQ is a list of questions frequently asked by stakeholders such as prospects and customers, along with answers to those questions. Just like what you are seeing right now.",
    },
    {
      id: "1",
      q: "Why should we use Faqbocs?",
      a: "Faqbocs helps you create, customize, and share your own FAQ page with incredible ease",
    },
    {
      id: "2",
      q: "Is it free to use?",
      a: "Yes, it is completely free to use!",
    },
    {
      id: "3",
      q: "Do I need a website?",
      a: "No, you don't! Faqbocs was created to help you make your own FAQ page without having to build a website.",
    },
    {
      id: "4",
      q: "Is it similar to Linktree?",
      a: "Faqbocs is more focus on providing important informations related to your businesses, organizations, events, or anything to your stakeholders or audience, while Linktree is a tool that allows you to share multiple links on social media. However, you can use both of them at the same time. Just put your Faqbocs link inside of your Linktree!",
    },
  ];
  const { data, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <Head>
        <title>Faqbocs: Create and share your own FAQ page</title>
        <link rel="icon" href="/faqbocs-favicon.png" />
        <meta
          name="description"
          content="A tool that allows you to create and share your own FAQ page with ease. Make FAQ page for your small businesses, organizations, events, or anything. What are you waiting for? Start using Faqbocs today!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Faqbocs: Create your own FAQ page" />
        <meta property="og:url" content="https://faqbocs.com" />
        <meta property="og:image" content="https://faqbocs.com/card.png" />
        <meta name="twitter:image" content={`https://faqbocs.com/card.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <main id="main" className="relative font-ssp">
        <div className="w-full min-h-[100vh] grid grid-cols-1 lg:grid-cols-[_1fr_500px] max-w-7xl mx-auto pt-24 lg:pt-7 2xl:min-h-fit 2xl:py-10 ">
          <div className="flex flex-col text-center sm:text-left justify-center sm:px-28 px-5">
            <h1 className="font-ssp font-black text-5xl sm:text-7xl">
              All questions answered in just{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-600 to to-blue-600 bg-clip-text ">
                one
              </span>{" "}
              link.{" "}
            </h1>
            <h2 className="font-ssp font-medium mt-4 text-xl sm:text-2xl">
              Create and share your own FAQ page with ease. Make FAQ page for
              your small businesses, organizations, or anything!
            </h2>
            <Link
              className="text-xl sm:text-2xl mx-auto sm:mx-0 font-semibold py-4 px-8 rounded-full bg-blue-600 text-white w-fit align-middle mt-8 shadow-lg hover:scale-105 transition duration-300"
              href={data ? "/admin" : "/auth/login"}
            >
              Get Started
            </Link>
          </div>
          <div className="flex my-auto">
            <div className="m-auto scale-75 2xl:scale-[0.8]">
              <Image
                src={landingPageFaqbocs}
                width={360}
                height={700}
                alt="Faqbocs"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="min-h-[100vh] flex 2xl:min-h-[800px] bg-slate-200">
          <div className="m-auto max-w-7xl px-5 sm:px-28 mx-auto flex flex-col text-center sm:py-28 py-24">
            <h1 className="font-ssp sm:text-6xl text-5xl font-black ">
              Harness the power of questions
            </h1>
            <h2 className="font-ssp text-center font-[500] mt-4 text-xl sm:text-2xl">
              Everyone wants to know, therefore everyone asks questions. Paying
              attention to common questions and sharing the answers is a
              remarkably powerful form of communication. Faqbocs helps you do
              it.
            </h2>
            <Link
              className="text-xl sm:text-2xl mx-auto font-semibold py-4 px-8 rounded-full bg-blue-600 text-white w-fit align-middle mt-8 shadow-lg hover:scale-105 transition duration-300"
              href={data ? "/admin" : "/auth/login"}
            >
              Get started for free
            </Link>
          </div>
        </div>
        <div
          id="guides"
          className="w-full min-h-[100vh] 2xl:min-h-[800px] sm:py-28 flex bg-slate-950  font-ssp md:px-28 px-5"
        >
          <div className=" sm:my-auto grid grid-cols-1 py-24  h-full min-h-[100vh]  2xl:min-h-fit 2xl:py-0 xl:grid-cols-[_700px_1fr] max-w-7xl m-auto">
            <div className="h-full hidden sm:flex">
              <div className="my-auto rounded-3xl overflow-hidden">
                <Image
                  src={adminPageFaqbocs}
                  alt=""
                  width={600}
                  className="rounded-3xl"
                />
              </div>
            </div>
            <div className="flex flex-col xl:m-0 mt-3 xl:justify-center ">
              <h1 className="sm:text-6xl text-center sm:text-left text-5xl text-white font-black">
                Create and customize your Faqbocs effortlessly
              </h1>
              <h2 className="font-ssp text-center sm:text-left mt-4 text-white font-[500] text-xl sm:text-2xl">
                Add all of the related commonly asked questions along with its
                answer. Everything comes together forming a beautiful FAQ page
                designed to comfort.
              </h2>
              <Link
                className="text-xl sm:text-2xl mx-auto sm:mx-0 font-semibold py-4 px-8 rounded-full bg-blue-600 text-white w-fit align-middle mt-8 shadow-lg hover:scale-105 transition duration-300"
                href={data ? "/admin" : "/auth/login"}
              >
                Get started for free
              </Link>
            </div>
            <div className="flex sm:hidden h-full mt-10">
              <div className="my-auto rounded-3xl overflow-hidden">
                <Image
                  src={adminPageFaqbocs}
                  alt=""
                  width={600}
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="guides"
          className="w-full min-h-[100vh] 2xl:min-h-[800px] sm:py-28 flex bg-white  font-ssp md:px-28 px-5"
        >
          <div className=" sm:my-auto grid grid-cols-1 py-24  h-full min-h-[100vh]  2xl:min-h-fit 2xl:py-0 xl:grid-cols-2 max-w-7xl m-auto">
            <div className="flex flex-col xl:m-0 mt-3 xl:justify-center ">
              <h1 className="sm:text-6xl text-center sm:text-left text-5xl font-black">
                Share your Faqbocs from wherever you want
              </h1>
              <h2 className="font-ssp text-center sm:text-left mt-4 font-[500] text-xl sm:text-2xl">
                Share your unique Faqbocs link anywhere you find your
                stakeholder or audience. Add it to any of your social media bio,
                or your microsite if any.
              </h2>
              <Link
                className="text-xl sm:text-2xl mx-auto sm:mx-0 font-semibold py-4 px-8 rounded-full bg-blue-600 text-white w-fit align-middle mt-8 shadow-lg hover:scale-105 transition duration-300"
                href={data ? "/admin" : "/auth/login"}
              >
                Get started for free
              </Link>
            </div>
            <div className="flex flex-col h-full mt-5">
              <div className="m-auto relative rounded-3xl overflow-hidden">
                <Image
                  src={shareImage}
                  alt=""
                  width={500}
                  className="rounded-3xl object-cover"
                />
              </div>
              <p className="text-right">
                <a href="https://www.freepik.com/free-vector/abstract-illustration-social-media-apps_13961233.htm#query=social%20network&position=7&from_view=search&track=ais">
                  Image by pikisuperstar
                </a>{" "}
                on Freepik
              </p>
            </div>
          </div>
        </div>

        <div
          id="questions"
          className="min-h-[100vh] flex 2xl:min-h-[800px] bg-slate-200 "
        >
          <div className="m-auto max-w-7xl px-5 sm:px-28 2xl:px-0 mx-auto flex flex-col text-center sm:py-28 py-24">
            <h1 className="font-ssp sm:text-6xl text-5xl mb-8 font-black">
              Got Questions?
            </h1>
            <div className="max-w-5xl flex flex-col gap-1 mx-auto">
              {datafaq.map((item) => (
                <FAQhome key={item.id} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
