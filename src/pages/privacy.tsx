import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Faqbocs</title>
      </Head>
      <div className="w-full font-ssp h-fit max-w-7xl mx-auto mt-[70px] sm:mt-20 py-14 text-xl font-medium px-5 sm:px-28">
        <h1 className=" sm:text-7xl text-5xl font-black mb-10">
          Privacy Policy
        </h1>
        <div className="text-2xl mb-6">
          <span className="font-bold">Last updated: </span> 19 May 2023
        </div>
        <div>
          By using Our site and services, it means that You have entrusted your
          personal data to Us and agreed to the terms and conditions at{" "}
          <Link href={"/terms"} className="text-blue-600 underlined">
            https://faqbocs.com/terms
          </Link>
          . We always try to keep your personal data confidential and not share
          it with irresponsible parties. The data taken includes:
        </div>
        <ol className="list-disc list-inside pl-5 py-3">
          <li>Profile picture</li>
          <li>Name</li>
          <li>Email</li>
          <li>Username</li>
          <li>Questions and Answers</li>
        </ol>
        <div>
          The data is stored in the database and will only be used as needed
          when using Our services. We, as administrators of this site and
          service, will not view the contents of the database for any reason.
        </div>
        <h2 className="text-3xl font-bold mt-5 mb-3">Use of Cookies</h2>
        <div>
          Our site uses cookies feature. By using this site, You also agree to
          the terms and conditions along with the privacy policy of cookies. We
          use cookies only to store your login data and will not be used for
          other purposes until We make changes to Our website and privacy
          policy.
        </div>
      </div>
    </>
  );
}

Privacy.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
