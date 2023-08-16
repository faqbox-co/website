import Image from "next/image";
import LogoText from "../assets/logo-light.png";
import Link from "next/link";
import { BsCloudCheck, BsViewList } from "react-icons/bs";
import { IoShareSocial } from "react-icons/io5";
import { FaShapes } from "react-icons/fa";
import { AiOutlineSave } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FiExternalLink } from "react-icons/fi";
import { RxShare1 } from "react-icons/rx";
import {FaQuestion, FaLink} from "react-icons/fa"
import { HiOutlineChevronRight } from "react-icons/hi";
import { useState, useEffect, useContext, useCallback, use } from "react";
import FaqbocsPreview from "./FaqbocsPreview";
import CustomSession from "@/@types/custom_session";
import DataContext, { DataContextProps } from "@/context/DataContext";
import { title } from "process";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";


export default function AdminNav({
 props,
}: {
  props: React.ReactElement["props"]
}) {
  const [preview, setPreview] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [popShare, setPopShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const session = props.data as CustomSession;
  const [faqbocsLink] = useState(`faqbocs.com/${session.username}`);
  const ctx = useContext(DataContext) as DataContextProps;

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

  return (
    <>
      {/* {ctx.loading && (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-slate-950/70 text-2xl font-bold z-30 text-white flex justify-center text-center items-center">
          <div className="square-spin-2"></div>
        </div>
      )} */}
      <div className="h-[70px] shadow-md px-8 w-full fixed top-0 right-0 z-10 flex items-center font-poppins justify-between bg-white">
        <Link
          href={"/admin/"}
          className=" relative flex justify-center items-center gap-2 "
        >
          <div className="relative w-8 h-8 2xl:w-10 2xl:h-10 ">
            <Image src={LogoText} alt="" fill />
          </div>
          <p className=" text-2xl font-semibold">Faqbocs</p>
        </Link>

        <div className="flex gap-7 items-center">
          {ctx.loading ? (
            <span>Saving ...</span>
          ) : (
            <span className="flex gap-2">
              Saved
              <BsCloudCheck className="text-2xl"/>
            </span>
          )}
          <Link
            href={"/admin/profile"}
            className="flex text-lg font-semibold gap-2 items-center "
            onClick={() => setMenu(2)}
          >
            <div
              className={`relative overflow-hidden w-12 h-12 rounded-full text-white flex ${
                ctx.image ? "bg-transparent" : "bg-slate-950"
              } justify-center items-center object-cover`}
            >
              {!ctx.image ? (
                session?.username![0].toUpperCase()
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
      </div>
      <div className="fixed sm:hidden z-10 font-poppins">
        <div className="fixed top-0 left-0 w-full bg-white ">
          <div className="px-5 py-2 flex justify-between items-center border-b-[1px] border-b-gray-300">
            <Link href={"/admin"} className="flex gap-2 font-medium">
              <div className="relative w-6 h-6">
                <Image src={LogoText} alt="" fill />
              </div>
              Faqbocs
            </Link>
            <Link
              href={"/admin/profile"}
              className="flex gap-2 items-center font-medium"
              onClick={() => setMenu(2)}
            >
              @{session?.username}
              <div
                className={`relative overflow-hidden w-8 h-8 rounded-full text-white flex ${
                  ctx.image ? "bg-transparent" : "bg-slate-950"
                } justify-center items-center object-cover`}
              >
                {!ctx.image ? (
                  session?.username![0].toUpperCase()
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
            <Link
              href={"/admin"}
              className={`flex flex-col items-center gap-1 border-b-2  pb-1 pt-2 ${
                menu === 0 ? "border-b-slate-900 bg-slate-100" : "border-b-white"
              } `}
              onClick={() => setMenu(0)}
            >
              <FaQuestion className="text-xl" />
              FAQs
            </Link>
            <Link
              href={"/admin/links"}
              className={`flex flex-col items-center gap-1 border-b-2  pb-1 pt-2 ${
                menu === 3 ? "border-b-slate-900 bg-slate-100" : "border-b-white"
              } `}
              onClick={() => setMenu(3)}
            >
              <FaLink className="text-xl" />
              Links
            </Link>
            <Link
              href={"/admin/appearance"}
              className={`flex flex-col items-center gap-1 border-b-2 pb-1 pt-2 ${
                menu === 1 ? "border-b-slate-900 bg-slate-100" : "border-b-white"
              }`}
              onClick={() => setMenu(1)}
            >
              <FaShapes className="text-2xl " />
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
              className={`flex flex-col items-center gap-1 border-b-2 border-b-white pb-1 pt-2`}
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
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-slate-950/40 backdrop-blur-sm flex z-10`}
          >
            <div
              className={`bg-white max-w-md w-full flex flex-col gap-3 p-5 font-poppins h-60 rounded-t-3xl fixed bottom-0 left-0`}
            >
              <h1 className="text-lg my-2 font-bold text-center">
                Share Your Faqbocs
              </h1>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between"
                onClick={() =>
                  navigator.share({
                    title: `${ctx.title} | Faqbocs`,
                    text: `${ctx.title} by ${session.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.username}`,
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
                  navigator.clipboard.writeText(faqbocsLink);
                  setCopied(true);
                }}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-6 h-6">
                    <Image src={LogoText} alt="" fill />
                  </div>
                  <p>{faqbocsLink}</p>
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
            href={`/${session.username}`}
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
          <FaqbocsPreview props={props} />
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

      <div className="fixed hidden top-0 left-0 h-[100vh] w-[200px] 2xl:w-[250px] bg-white text-slate-950 p-5 2xl:p-8 font-poppins font-medium z-10 sm:flex flex-col justify-between shadow-lg">
        <div className="flex flex-col gap-5">

          <Link
            href={"/admin/"}
            className=" relative flex justify-center items-center gap-2 mb-[50px]"
          >
            <div className="relative w-8 h-8 2xl:w-10 2xl:h-10 ">
              <Image src={LogoText} alt="" fill />
            </div>
            <p className=" text-2xl font-semibold">Faqbocs</p>
          </Link>

          <Link
            href={"/admin/"}
            className={`py-3 px-4 hover:bg-slate-100 transition justify-center rounded-lg flex gap-2 items-center ${
              menu === 0 ? "bg-slate-100" : ""
            }`}
            onClick={() => setMenu(0)}
          >
            <FaQuestion className="text-xl" />
            FAQs
          </Link>

          <Link
            href={"/admin/links"}
            className={`py-3 px-4 hover:bg-slate-100 transition justify-center rounded-lg flex gap-2 items-center ${
              menu === 3 ? "bg-slate-100" : ""
            }`}
            onClick={() => setMenu(3)}
          >
            <FaLink className="text-xl" />
            Links
          </Link>

          <Link
            href={"/admin/appearance"}
            className={`py-3 px-4 hover:bg-slate-100 transition mb-10 justify-center rounded-lg flex gap-2 items-center ${
              menu === 1 ? "bg-slate-100" : ""
            }`}
            onClick={() => setMenu(1)}
          >
            <FaShapes className="text-2xl " />
            Appearance
          </Link>

          {/* <button
            className="py-3 px-4 border-[1px] border-slate-300 transition rounded-full hover:border-transparent hover:bg-slate-200 flex justify-center gap-2 items-center"
            onClick={(e) => saveChange(e)}
          >
            <AiOutlineSave className="text-2xl " />
            Save
          </button> */}

          <button
            className="py-3 px-4 border-[1px] border-slate-300 transition rounded-full hover:border-transparent hover:bg-slate-200 flex justify-center gap-2 items-center"
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
            className="py-3 hidden sm:flex lg:hidden px-4 bg-slate-200 hover:bg-blue-600 transition rounded-full justify-center hover:text-white gap-2 items-center"
          >
            <AiOutlineEye className="text-2xl" />
            Preview
          </Link>

          <Link
            href={`/${session.username}`}
            target="_blank"
            className="py-3 px-4 bg-blue-600 mb-10 transition rounded-full hover:bg-blue-700 justify-center text-white flex gap-2 items-center"
          >
            View Result
            <FiExternalLink className="text-xl" />
          </Link>

          {/* <button className="">
            <CiLogout className="text-xl" />
            Log out
          </button> */}
        </div>

        

        {popShare && (
          <div
            id="share2"
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] px-10 bg-slate-950/40 backdrop-blur-sm flex`}
          >
            <div className="bg-white max-w-lg w-full flex flex-col gap-3 p-6 font-poppins m-auto rounded-2xl">
              <h1 className="text-lg my-2 font-bold text-center">
                Share Your Faqbocs
              </h1>
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between"
                onClick={() =>
                  navigator.share({
                    title: `${title} | Faqbocs`,
                    text: `${ctx.title} by ${session.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.username}`,
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
                className="p-4 border-2 w-full transition border-gray-200 flex font-normal justify-between rounded-lg hover:bg-gray-200 cursor-pointer items-center "
                onClick={() => {
                  navigator.clipboard.writeText(faqbocsLink);
                  setCopied(true);
                }}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-6 h-6">
                    <Image src={LogoText} alt="" fill />
                  </div>
                  <p>{faqbocsLink}</p>
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
  );
}

