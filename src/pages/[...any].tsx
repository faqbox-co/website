import IFaq from "@/interfaces/faq";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Faqbocs from "@/components/Faqbocs";
import notFound from "../assets/notfound.jpg";

type ResProp = {
  result: { status: "NOT_FOUND" | "FOUND"; data: any; url: string };
};

export default function Any({ result: props }: ResProp) {
  return (
    <>
      {props.status === "FOUND" ? (
        <Found result={props} />
      ) : (
        <PageNotFound result={props} />
      )}
    </>
  );
}

function Found({ result }: ResProp) {
  const data = result.data as IFaq;
  const titleMessage = data.title + " | Faqbocs";
  return (
    <>
      <Head>
        <title>{titleMessage}</title>
        <meta name="description" content={`This is ${data.username}'s Faqbocs. Check that out!`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={titleMessage} />
        <meta property="og:url" content={`https://faqbocs.com`} />
        <meta property="og:image" content={data.image ? result.url : "https://faqbocs.com/card-2.png"} />
        <meta name="twitter:image" content={data.image ? result.url : `https://faqbocs.com/card-2.png`} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Faqbocs {...data} email={result.data.email} />
    </>
  );
}

function PageNotFound({ result }: ResProp) {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta
          name="description"
          content="A tool that allows you to create your own FAQ page with ease"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-[100vw] h-[100vh] flex">
        <div className="flex flex-col m-auto">
          <div className=" mx-auto relative sm:w-[450px] sm:h-[450px] w-[300px] h-[300px]">
            <Image src={notFound} alt="not found" fill />
          </div>
          <p className="sm:text-4xl text-2xl font-black text-center">
            Sorry, Page Not Found
          </p>
          <Link
            className="text-xl sm:text-2xl mx-auto font-semibold py-3 px-6 rounded-full bg-blue-600 text-white w-fit align-middle mt-6 shadow-lg hover:scale-105 transition duration-300"
            href={"/"}
          >
            Home
          </Link>
        </div>
        <p className="text-sm absolute bottom-0 left-0">
          <a href="https://www.freepik.com/free-vector/page-found-concept-illustration_7887410.htm#query=404%20not%20found%20blue&position=12&from_view=search&track=ais#position=12&query=404%20not%20found%20blue">
            Image by storyset
          </a>{" "}
          on Freepik
        </p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const url = `https://${ctx.req.headers.host}/api/images${ctx.resolvedUrl}`;
  const host = process.env.NEXTAUTH_URL!;

  if (!Array.isArray(query) && !query.any) {
    return {
      props: {
        result: {
          status: "NOT_FOUND",
          data: {},
          url,
        },
      },
    };
  }

  let user = "";
  if (Array.isArray(query)) user = query[0];
  else user = query.any![0] as string;

  const resp = await fetch(`${host}/api/faq/${user}`.trim());
  const text = await resp.text();
  const parsed = JSON.parse(text);

  if (!parsed.ok) {
    return {
      props: {
        result: {
          status: "NOT_FOUND",
          data: {},
          url,
        },
      },
    };
  }

  return {
    props: {
      result: {
        status: "FOUND",
        data: parsed.message,
        url,
      },
    },
  };
};