import Image from "next/image";
import LogoText from "../assets/faqbocs-favicon.png";
import Link from "next/link";
import { BsCloudCheck, BsPersonFill } from "react-icons/bs";
import { IoShapes, IoShareSocial } from "react-icons/io5";
import { FaShapes } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FiExternalLink, FiLink } from "react-icons/fi";
import { RxShare1 } from "react-icons/rx";
import { FaQuestion, FaLink } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useState, useEffect, useContext, useCallback, use } from "react";
import FaqbocsPreview from "./FaqbocsPreview";
import CustomSession from "@/types/custom-session";
import DataContext, { DataContextProps } from "@/context/DataContext";
import { title } from "process";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/router";

export default function AdminNav({
  props,
}: {
  props: React.ReactElement["props"];
}) {
  const ctx = useContext(DataContext) as DataContextProps;
  const route = useRouter();

  const [preview, setPreview] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [popShare, setPopShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const session = ctx.session;
  const [popProfile, setPopProfile] = useState(false);

  const path = ["", "links", "appearance", "profile", "preview"];

  function generateMenuStyleDesktop(n: number) {
    if (path[n] === route.asPath.slice(7)) {
      return "py-3 px-4 hover:bg-gray-800 transition rounded-md  flex gap-2 items-center bg-gray-800";
    } else {
      return "py-3 px-4 hover:bg-gray-800 transition rounded-md  flex gap-2 items-center";
    }
  }

  function generateMenuStyleMobile(n: number) {
    if (path[n] === route.asPath.slice(7)) {
      return "flex flex-col items-center gap-1 border-b-2  pb-1 pt-2 border-b-slate-900 bg-slate-100";
    } else {
      return "flex flex-col items-center gap-1 border-b-2 border-b-gray-300  pb-1 pt-2 bg-white ";
    }
  }

  function signOutHandler() {
    signOut({
      callbackUrl: "/",
    });
  }

  useEffect(() => {
    window.onclick = (e) => {
      if (e.target == document.getElementById("share1")) {
        setPopShare(false);
      }
      if (e.target == document.getElementById("share2")) {
        setPopShare(false);
      }
    };
  });

  const verifiedAccount = ["faqbocs", "farisyah", "ziprawan"];

  return session.status === "authenticated" ? (
    <>
      <div className="h-[60px] shadow-md px-8 w-full fixed top-0 right-0 z-10 flex items-center font-poppins justify-end bg-white">
        {popProfile && (
          <>
            <button
              className="fixed top-0 right-0 w-[100vw] h-[100vh] bg-slate-900/30 backdrop-blur-[2px] z-20"
              onClick={() => setPopProfile(false)}
            ></button>
            <div className="fixed w-[350px] min-h-[500px] p-5 rounded-2xl shadow-md z-30 right-5 top-[60px] bg-white flex flex-col gap-3 font-poppins">
              <div className="flex flex-col gap-3">
                <div
                  className={`relative overflow-hidden w-36 h-36 rounded-full m-auto text-white ${
                    ctx.image ? "bg-transparent" : "bg-slate-950"
                  } flex justify-center items-center text-7xl font-semibold`}
                >
                  {!ctx.image ? (
                    session.data.username![0].toUpperCase()
                  ) : (
                    <Image
                      unoptimized
                      fill
                      src={ctx.image}
                      alt=""
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="font-semibold text-lg flex gap-2 items-center justify-center">
                  @{session.data.username}
                  {verifiedAccount.includes(session.data.username!) && (
                    <GoVerified className=" text-yellow-500" />
                  )}
                </p>
              </div>
              <div className="p-4 mt-2  bg-gray-100 rounded-lg">
                <p className="font-semibold text-sm">Name</p>
                <p>{session.data.user?.name}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold text-sm">Email</p>
                <p>{session.data.user?.email}</p>
              </div>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between hover:bg-gray-100 transition rounded-lg "
                onClick={() =>
                  navigator.share({
                    title: `${title} | Faqbocs`,
                    text: `${title} by ${session.data.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.data.username}`,
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <RxShare1 className="text-2xl" />
                  Share this Faqbocs
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
              <div
                className="p-4 w-full  flex font-normal justify-between cursor-pointer items-center hover:bg-gray-100 transition rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `faqbocs.com/${session.data.username}`
                  );
                  alert("Link Copied!");
                }}
              >
                <div className="flex gap-3 items-center">
                  <FiLink className="text-xl" />
                  <p>Copy Faqbocs link</p>
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between hover:bg-gray-100 transition rounded-lg "
                onClick={signOutHandler}
              >
                <div className="flex items-center gap-3">
                  <BiLogOut className="text-2xl" />
                  Logout
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
              {/* <button
                className="py-3 px-4 mt-3 w-full items-center bg-gray-100 hover:bg-slate-950 hover:text-white transition  rounded-xl text-semibold flex gap-2"
                onClick={signOutHandler}
              >
                <BiLogOut className="text-2xl" />
                Log Out
              </button> */}
            </div>
          </>
        )}
        <div className="flex gap-7 items-center">
          {ctx.loading ? (
            <span>Saving ...</span>
          ) : (
            <span
              className="flex gap-2 cursor-pointer"
              onClick={ctx.saveChange}
            >
              Saved
              <BsCloudCheck className="text-2xl" />
            </span>
          )}
          <div className="flex text-xl font-semibold gap-2 items-center relative">
            <div
              className={`relative overflow-hidden w-12 h-12 rounded-full text-white flex z-30 ${
                ctx.image ? "bg-transparent" : "bg-slate-950"
              } justify-center items-center object-cover hover:cursor-pointer`}
              onClick={() => {
                setPopProfile(!popProfile);
              }}
            >
              {!ctx.image ? (
                session.data?.username![0].toUpperCase()
              ) : (
                <Image
                  unoptimized
                  src={ctx.image}
                  alt=""
                  fill
                  className="object-cover hover:cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed sm:hidden z-10 font-poppins">
        <div className="fixed top-0 left-0 w-full bg-white ">
          <div className="px-5 py-2 flex justify-between items-center border-b-[1px] border-b-gray-300">
            <Link
              href={"/admin"}
              className="flex gap-1 font-semibold font-ssp text-lg items-center"
            >
              <div className="relative w-6 h-6 ">
                <Image src={LogoText} alt="" fill />
              </div>
              Faqbocs
            </Link>
            <Link
              href={"/admin/profile"}
              className="flex gap-5 items-center font-medium"
            >
              {ctx.loading ? (
                <span>Saving ...</span>
              ) : (
                <span
                  className="flex text-sm gap-2 cursor-pointer"
                  onClick={ctx.saveChange}
                >
                  Saved
                  <BsCloudCheck className="text-xl" />
                </span>
              )}
              <div
                className={`relative overflow-hidden w-8 h-8 rounded-full text-white flex  ${
                  ctx.image ? "bg-transparent" : "bg-slate-950"
                } justify-center items-center object-cover`}
                onClick={() => setMenu(2)}
              >
                {!ctx.image ? (
                  session.data?.username![0].toUpperCase()
                ) : (
                  <Image
                    unoptimized
                    src={ctx.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-4 w-full  shadow-sm bg-white text-xs text-center">
            <Link href={"/admin"} className={generateMenuStyleMobile(0)}>
              <FaQuestion className="text-xl" />
              FAQs
            </Link>
            <Link href={"/admin/links"} className={generateMenuStyleMobile(1)}>
              <FaLink className="text-xl" />
              Links
            </Link>
            <Link
              href={"/admin/appearance"}
              className={generateMenuStyleMobile(2)}
              onClick={() => setMenu(1)}
            >
              <IoShapes className="text-2xl " />
              Appearance
            </Link>
            {/* <div
              className={`flex flex-col items-center gap-1 border-b-2 border-b-white pb-1 pt-2`}
              onClick={(e) => saveChange(e)}
            >
              <AiOutlineSave className="text-2xl " />
              Save
            </div> */}
            <div
              className={`flex flex-col items-center gap-1 border-b-2 border-b-gray-300 pb-1 pt-2`}
              onClick={() => {
                setPopShare(true);
                setCopied(false);
              }}
            >
              <IoShareSocial className="text-2xl " />
              Share
            </div>
          </div>
        </div>
        {popShare && (
          <div
            id="share1"
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-slate-950/40 backdrop-blur-sm flex z-10 `}
          >
            <div
              className={`bg-white w-[100vw] flex flex-col gap-3 p-5 font-poppins h-60 rounded-t-3xl fixed bottom-0 left-0`}
            >
              <h1 className="text-lg my-2 font-bold text-center">
                Share Your Faqbocs
              </h1>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between"
                onClick={() =>
                  navigator.share({
                    title: `${ctx.clientData.title} | Faqbocs`,
                    text: `${ctx.clientData.title} by ${session.data.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.data.username}`,
                  })
                }
              >
                <div className="w-fit flex items-center gap-3">
                  <RxShare1 className="text-2xl" />
                  Share this Faqbocs
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
              <div
                className="p-3 border-2 w-full border-gray-200 flex font-normal justify-between rounded-lg text-sm hover:bg-gray-200 cursor-pointer items-center"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `faqbocs.com/${session.data.username}`
                  );
                  setCopied(true);
                }}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-6 h-6">
                    <Image src={LogoText} alt="" fill />
                  </div>
                  <p>{`faqbocs.com/${session.data.username}`}</p>
                </div>
                <MdContentCopy className="text-lg" />
              </div>
              <p
                className={`${
                  copied ? "text-green-500" : ""
                } font-medium text-sm`}
              >
                {copied ? "Copied !" : ""}
              </p>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 w-full justify-center gap-2 h-fit flex items-center z-0">
          <button
            className="py-3 px-4 font-poppins font-medium rounded-full w-fit h-fit bg-blue-600 items-center text-white shadow-sm flex gap-2"
            onClick={() => setPreview(true)}
          >
            Preview
            <AiOutlineEye className="text-xl" />
          </button>
          <a
            href={`/${session.data.username}`}
            title="View Result"
            target="_blank"
            className="p-3 font-poppins font-medium rounded-full w-fit h-fit bg-blue-600 items-center text-white shadow-sm"
          >
            <FiExternalLink className="text-xl" />
          </a>
        </div>

        <div
          className={`${
            !preview
              ? "translate-y-[100vh] opacity-50"
              : "translate-y-0 opacity-100"
          } transition duration-300 ease-out relative z-0 `}
        >
          <FaqbocsPreview />
        </div>
        {preview && (
          <button
            className="h-10 w-10 rounded-full flex justify-center items-center text-slate-900 bg-gray-200 transition  text-xl fixed top-2 right-2 z-40"
            onClick={() => setPreview(false)}
          >
            <RxCross1 className="text-2xl" />
          </button>
        )}
      </div>

      <div className="fixed hidden top-0 left-0 h-[100vh] w-[200px] 2xl:w-[250px] bg-gray-950 text-slate-100 p-5  font-poppins z-10 sm:flex flex-col justify-between shadow-md">
        {popProfile && (
          <button
            className="absolute z-20 top-0 left-0 w-full h-full bg-slate-900/30 backdrop-blur-[2px]"
            onClick={() => setPopProfile(false)}
          ></button>
        )}

        <div className="flex flex-col gap-3 text-sm 2xl:text-base">
          <Link
            href={"/admin/"}
            className=" relative flex items-center gap-3 font-ssp px-3 pb-7 pt-2 border-b-2 mb-7 border-slate-800"
          >
            <div className="relative w-8 h-8 2xl:w-10 2xl:h-10 ">
              <Image src={LogoText} alt="" fill />
            </div>
            <p className="text-2xl 2xl:text-3xl font-bold">Faqbocs</p>
          </Link>

          <h2 className="text-sm text-gray-500">GENERAL</h2>
          <Link href={"/admin/"} className={generateMenuStyleDesktop(0)}>
            <FaQuestion className="text-xl" />
            FAQs
          </Link>

          <Link href={"/admin/links"} className={generateMenuStyleDesktop(1)}>
            <FaLink className="text-xl" />
            Links
            <span className="text-white ml-1 bg-blue-600 text-xs py-1 px-2 rounded-full ">
              new
            </span>
          </Link>

          <Link
            href={"/admin/appearance"}
            className={generateMenuStyleDesktop(2)}
            onClick={() => setMenu(1)}
          >
            <IoShapes className="text-2xl " />
            Appearance
          </Link>

          <button
            className="py-3 px-4 hover:bg-gray-800 transition  rounded-md flex gap-2 items-center"
            onClick={() => {
              setPopShare(true);
              setCopied(false);
            }}
          >
            <IoShareSocial className="text-2xl " />
            Share
          </button>

          <Link
            href={"/admin/preview"}
            className={generateMenuStyleDesktop(4) + "hidden sm:flex lg:hidden"}
          >
            <AiOutlineEye className="text-2xl" />
            Preview
          </Link>

          <Link
            href={`/${session.data.username}`}
            target="_blank"
            className="py-3 px-4 hover:bg-gray-800 transition rounded-md flex gap-2 items-center"
          >
            <FiExternalLink className="text-2xl" />
            View Result
          </Link>

          <h2 className="text-sm text-gray-500 mt-10">ACCOUNT</h2>
          <Link href={"/admin/profile"} className={generateMenuStyleDesktop(3)}>
            <BsPersonFill className="text-2xl" />
            Profile
          </Link>

          <button
            className="flex py-3 px-4 hover:bg-gray-800 transition rounded-md gap-2 items-center"
            onClick={signOutHandler}
          >
            <BiLogOut className="text-2xl" />
            Logout
          </button>

          {/* <button className="">
            <CiLogout className="text-xl" />
            Log out
          </button> */}
        </div>

        {popShare && (
          <div
            id="share2"
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] px-10 bg-slate-950/40 backdrop-blur-sm flex text-slate-900`}
          >
            <div className="bg-white max-w-lg w-full flex flex-col gap-3 p-6 font-poppins m-auto rounded-2xl">
              <h1 className="text-lg my-2 font-bold text-center">
                Share Your Faqbocs
              </h1>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between hover:bg-gray-100 transition rounded-lg"
                onClick={() =>
                  navigator.share({
                    title: `${title} | Faqbocs`,
                    text: `${ctx.clientData.title} by ${session.data.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.data.username}`,
                  })
                }
              >
                <div className="w-fit flex items-center gap-3">
                  <RxShare1 className="text-2xl" />
                  Share this Faqbocs
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
              <div
                className="p-4 border-2 w-full transition border-gray-200 flex font-normal justify-between rounded-lg hover:bg-gray-100 cursor-pointer items-center "
                onClick={() => {
                  navigator.clipboard.writeText(
                    `faqbocs.com/${session.data.username}`
                  );
                  setCopied(true);
                }}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-6 h-6">
                    <Image src={LogoText} alt="" fill />
                  </div>
                  <p>{`faqbocs.com/${session.data.username}`}</p>
                </div>

                <p className={`${copied ? "text-green-500" : ""} font-medium`}>
                  {copied ? "Copied !" : "Copy"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}
