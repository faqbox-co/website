import Layout from "@/components/Layout";
import Head from "next/head";

export default function Start() {
  return (
    <>
      <Head>
        <title>Getting Started | Faqbocs</title>
      </Head>
      <div className="w-full font-ssp h-fit max-w-7xl mx-auto mt-[70px] sm:mt-20 py-14 sm:text-2xl text-xl font-medium px-5 sm:px-28">
        <h1 className=" sm:text-7xl text-5xl text-center font-black mb-10">
          Getting Started
        </h1>
        <h3 className="text-3xl mt-6 mb-3 font-bold">1. Sign up for free!</h3>
        <p className="mb-5 ">
          If you are new user, you will need to choose your username first. It
          is unique and <b>you will not be able to change it.</b>.
        </p>
        <h3 className="text-3xl mt-6 mb-3 font-bold">
          2. Add questions along with its answer
        </h3>
        <p className="mb-5 ">
          In the dashboard you will be able to add questions and answers related
          to the information you want to provide. You can also edit and delete
          your questions and answers.{" "}
        </p>
        <h3 className="text-3xl mt-6 mb-3 font-bold">
          3. Customize your Faqbocs
        </h3>
        <p className="mb-5 ">
          Go to appearence by clicking <b>Appearence</b> button on the
          side bar. On the appearance page, you will be able to customize
          your Faqbocs such as choosing header image, changing the title, and 
          choosing a theme that suits your Faqbocs. You can see a real-time
          preview of your Faqbocs.
        </p>
        {/* <h3 className="text-3xl mt-6 mb-3 font-bold">
          4. Do not forget to save your changes
        </h3>
        <p className="mb-5 ">
          You will need to save every changes that you make by clicking the{" "}
          <b>Save</b> button on the navigation bar, otherwise it will be gone.
        </p> */}
        <h3 className="text-3xl mt-6 mb-3 font-bold">5. Share your Faqbocs!</h3>
        <p className="mb-5 ">
          You can share your Faqbocs link by clicking the <b>Share</b> button on
          the nav bar. Now your audience or stakeholders can have access
          to the information they need.{" "}
        </p>
        <h3 className="text-3xl mt-6 mb-3 font-bold">6. Log out</h3>
        <p className="mb-5 ">
          Go to profile page by clicking your profile picture on the top right of your device and You will find Log
          out button there!{" "}
        </p>
      </div>
    </>
  );
}

Start.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
