import Layout from "@/components/Layout";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About us | Faqbocs</title>
      </Head>
      <div className="w-full font-ssp h-fit max-w-7xl mx-auto mt-[70px] sm:mt-20 py-14 sm:text-2xl text-xl font-medium px-5 sm:px-28">
        <h1 className=" sm:text-7xl text-5xl text-center font-black mb-10">
          About Us
        </h1>
        <p className="mb-5 ">
          Faqbocs is a tool that allows you to create, customize, and share your
          own FAQ page with incredible ease. You can make your own Faqbocs for
          your small businesses, organizations, events, or anything. Faqbocs was
          created by Faris Rafie Syahzani and Aziz Ridwan Pratama. They are a
          highschool students in Bekasi, West Java, Indonesia.
        </p>
        <p className="mb-5 ">
          Paying attention to common questions and sharing the answers is a
          remarkably powerful form of communication. That is why almost every
          company or business provides FAQ page inside of their website.{" "}
        </p>
        <p className="mb-5 ">
          Now let say you do not have a website for your small business,
          organizations, or events, but you need to provide some important
          informations to your stakeholders or audience. This is where the ideas
          of creating a tool that allows everyone to build, customize, and share
          their own FAQ page easily came to our mind. We then decided to work on
          Faqbocs for around 1 month before launched it shortly after.
        </p>
      </div>
    </>
  );
}

About.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
