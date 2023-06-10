import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Faqbocs</title>
      </Head>
      <div className="w-full font-ssp h-fit max-w-7xl mx-auto mt-[70px] sm:mt-20 py-14 text-xl font-medium px-5 sm:px-28">
        <h1 className=" sm:text-7xl text-5xl font-black mb-10">
          Terms and Conditions
        </h1>
        <div className="text-2xl mb-6">
          <span className="font-bold">Last updated: </span> 19 May 2023
        </div>
        <div>
          It&#39;s highly recommended that before using Our site any further, You
          first read and understand the terms and conditions that apply. The
          following Terms and Conditions are conditions for visiting the site,
          Content, Services, and other features on Our website. By accessing or
          using this site, it means that You understand and agree and are bound
          and subject to all the terms and conditions that apply to this site.
        </div>
        <h3 className="text-3xl mt-6 mb-3 font-bold">1. Definition</h3>
        <div>
          Each of the following words or terms used in these Terms and
          Conditions has the following meanings below unless the word or term
          concerned in its use expressly determines otherwise.
          <ol className="list-disc list-outside pl-10 py-3">
            <li>
              &#34;Us&#34;, &#34;We&#34;, &#34;Our&#34;, means the owner and manager
              of the site
            </li>
            <li>
              &#34;You&#34;, means everyone who accesses and uses the Services
              provided by Us.
            </li>
            <li>
              &#34;Services&#34;, means each and every service and information
              contained therein and not limited to the information provided,
              application Services and features, as well as data support
              provided by Us.
            </li>
            <li>
              &#34;Users&#34;, &#34;User&#34;, means everyone who accesses and uses
              Our Services including Unregistered Users and Registered Users
            </li>
            <li>
              &#34;Registered Users&#34;, means everyone who accesses and uses Our
              Services, and has registered and has an account on Our site.
            </li>
            <li>
              &#34;Third Party&#34;, means any Third Party, including but not
              limited to for the avoidance of doubt, whether an individual or an
              entity, other party to a contract, government or private.
            </li>
            <li>
              &#34;Profile&#34;, means personal data used by the Users, and
              becomes the basic information for the Users.
            </li>
            <li>
              &#34;Content&#34;, means text, data, information, numbers, images,
              graphics, photos, audio, video, User names, information,
              applications, links, comments, ratings, designs, or any other
              material displayed on the site.
            </li>
          </ol>
        </div>
        <h3 className="text-3xl my-3 font-bold">2. Services</h3>
        <div>
          <ol className="list-disc list-outside pl-10 py-3">
            <li>
              The information contained at Out site is displayed according to
              the actual situation for general information purposes. We strive
              to provide and display up-to-date and accurate information, but We
              do not guarantee that all information is timely or relevant to
              Your needs.
            </li>
            <li>
              Information on this site is provided to assist You in conveying
              information about yourself or others. And You are solely
              responsible for all such information.
            </li>
          </ol>
        </div>
        <h3 className="text-3xl my-3 font-bold">3. Usage</h3>
        <div>
          By continuing to use or access this site, You have stated and
          guaranteed to Us that:
          <ol className="list-disc list-outside pl-10 py-3">
            <li>
              We will always try to maintain the confidentiality of your
              information as written on{" "}
              <Link className="l text-blue-500 underline" href="/privacy">
                https://faqbocs.com/privacy
              </Link>
            </li>
            <li>
              You are not allowed to use the site in the following cases:
              <ol className="list-decimal list-outside pl-7 py-3">
                <li>
                  To hurt, torture, humiliate, slander, defame, threaten,
                  intimidate or disturb other people or businesses, or anything
                  that violates privacy or that We consider to be obscene,
                  insulting, hateful, indecent, inappropriate, inappropriate,
                  unacceptable acceptable, discriminatory or damaging.
                </li>
                <li>In an unlawful, fraudulent or commercial manner.</li>
                <li>
                  Violate the rights of others, including without exception:
                  patents, trademarks, copyrights, trade secrets, publicity and
                  other proprietary rights.
                </li>
                <li>
                  To create, check, update, modify or repair someone else&#39;s
                  database, record or directory.
                </li>
                <li>
                  Changing or rearranging any part of this site will disrupt or
                  place an undue burden on Our technical and communication
                  systems
                </li>
              </ol>
            </li>
            <li>
              We are not responsible for losses due to failure to access the
              site, and methods of using the site that are beyond Our control.
            </li>
            <li>
              We are not responsible or liable for any unexpected loss or damage
              when You access or use this site. This includes loss of expected
              savings, loss of business or business opportunity, loss of income
              or profits, or any loss or damage incurred by You as a result of
              using this site.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

Terms.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
