import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CustomSession from "@/types/custom-session";
import newUser from "../../assets/newuser-image.jpg";
import LogoText from "../../assets/logo-light.png";

export default function NewUser() {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const invalidUsernames = [
    "faqbocs",
    "_next",
    "api",
    "auth",
    "contact",
    "guides",
    "privacy",
    "terms",
    "start",
    "404",
    "500",
    "card-2.png",
    "card.png",
    "faqbocs-favicon.png",
    "favicon.ico",
    "logo-light.png",
    "next.svg",
    "robots.txt",
    "round-logo-light.png",
    "vercel.svg",
  ];
  const [status, setStatus] = useState<React.ReactElement | null>(null);
  const [invalid, setInvalid] = useState(false);

  const session = useSession();

  useEffect(() => {
    const username_re = /^(?=[a-zA-Z0-9._]{2,16}$)(?!.*[_.]{2,})[^_.].*[^_.]$/;
    if (username_re.test(username)) {
      setStatus(null);
      setInvalid(false);
    }
  }, [username]);

  async function submitData(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    event.preventDefault();

    const username_re = /^(?=[a-zA-Z0-9._]{2,16}$)(?!.*[.]{2,}).*$/;
    if (!username_re.test(username)) {
      setInvalid(true);
      return setStatus(
        <>
          Usernames contains 2-16 character and can only include 2-16 letters,
          numbers, underscores ( _ ) and periods ( . ).
        </>
      );
    }
    if (invalidUsernames.includes(username)) {
      setInvalid(true);
      return setStatus(<>This username isn&#39;t allowed.</>);
    }

    const updatedSession = (await session.update({
      username,
    })) as CustomSession | null;

    if (!updatedSession) {
      return setStatus(<>Internal server error</>);
    }

    if (updatedSession.username) {
      await fetch("/api/faq", {
        method: "POST",
        body: JSON.stringify({
          title: "My FAQ",
          theme: "faqbocs-monochrome",
          data: [],
          image: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return push("/admin");
    } else {
      return setStatus(<>Username is already taken</>);
    }
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;

    switch (id) {
      case "username":
        setUsername(event.target.value);
        break;
      default:
        console.error("Unhandled target id");
    }
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
        <div className="p-10 w-full flex flex-col items-center justify-center">
          <div className="max-w-xl w-full mb-10">
            <h1 className="text-5xl font-black mb-3">Welcome to Faqbocs</h1>
            <p className="font-medium text-lg text-slate-500">
              Choose your Faqbocs username. It is unique and you cannot change
              it later.
            </p>
          </div>

          <form onSubmit={submitData} className="w-full max-w-xl ">
            <div className="w-full mx-auto mb-12">
              <div
                className={`bg-gray-100 rounded-xl flex flex-col gap-1 py-4 px-6 font-poppins ${
                  status || invalid ? "border-2 border-red-500" : ""
                }`}
              >
                <div className="flex gap-1">
                  <p>faqbocs.com/ </p>
                  <input
                    className="bg-transparent outline-none w-full"
                    id="username"
                    autoComplete="off"
                    autoFocus
                    spellCheck="false"
                    onChange={changeHandler}
                    value={username}
                    placeholder="Username"
                  ></input>
                </div>
              </div>
              {(status || invalid) && <p className="text-red-600">{status}</p>}
            </div>

            <p className="font-medium text-sm text-slate-500 max-w-xl mb-8">
              By clicking <b>Create account</b>, you agree to Faqbocs{" "}
              <Link href="/terms" className="underline">
                Terms and Conditions
              </Link>{" "}
              and confirm you have read our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              className="py-3 px-4 font-poppins font-semibold rounded-full w-full bg-blue-600 text-white"
              type="submit"
            >
              Create account
            </button>
          </form>
        </div>
        <div className="relative w-full h-full hidden sm:block">
          <Image
            alt="Bali, Indonesia"
            src={newUser}
            fill
            className="object-cover object-top"
          />
        </div>
      </main>
    </>
  );
}

export { default as getServerSideProps } from "@/utils/checkUname";
