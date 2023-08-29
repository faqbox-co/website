import Image from "next/image";
import { RxShare1 } from "react-icons/rx";
import { GoVerified } from "react-icons/go";
import { useState, useEffect, useContext } from "react";
import AccordionItem from "./AccordionItem";
import parse from "html-react-parser";
import DataContext, { DataContextProps } from "@/context/DataContext";
import Link from "next/link";
import LogoText from "../assets/faqbocs-favicon.png";
import LogoTextDark from "../assets/logo-dark.png";
import CustomSession from "@/@types/custom_session";
import IData from "@/interfaces/data";
import { FiLink, FiMail } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import ILink from "@/interfaces/links";

export default function FaqbocsPreview({
  props,
}: {
  props: React.ReactElement["props"];
}) {
  const { data, theme, title, image, link } = useContext(
    DataContext
  ) as DataContextProps;
  const session = props.data as CustomSession;

  const [search, setSearch] = useState("");
  const [dataSearched, setDataSearched] = useState<IData[]>(data);
  const [popLink, setPopLink] = useState(false);
  const [popShare, setPopShare] = useState(false);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setDataSearched(data);
    } else {
      setDataSearched(
        data.filter((faq) => faq.q.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, data]);

  const [colorBg, setColorBg] = useState("");
  const [colorText, setColorText] = useState("");
  const [colorPrimary, setColorPrimary] = useState("");
  const [colorShare, setColorShare] = useState("");
  const [dark, setDark] = useState(false);
  const [colorTitle, setColorTitle] = useState("");

  useEffect(() => {
    switch (theme) {
      case "faqbocs-monochrome":
        setColorBg("bg-white");
        setColorText("");
        setColorPrimary("bg-gray-200");
        setColorShare("bg-slate-900 text-white");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-blue-sky":
        setColorBg("bg-blue-600");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-grass":
        setColorBg("bg-green-500");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-red":
        setColorBg("bg-red-500");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-pink":
        setColorBg("bg-pink-500");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-blue-reverse":
        setColorBg("bg-white");
        setColorText("text-white");
        setColorPrimary("bg-blue-600");
        setColorShare("bg-slate-900 text-white");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-green-reverse":
        setColorBg("bg-white");
        setColorText("text-white");
        setColorPrimary("bg-green-600");
        setColorShare("bg-slate-900 text-white");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-black":
        setColorBg("bg-gray-900");
        setColorText("text-gray-100");
        setColorPrimary("bg-gray-700");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-gray-100");
        break;
      case "faqbocs-black-white":
        setColorBg("bg-gray-900");
        setColorText("");
        setColorPrimary("bg-gray-50");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-gray-100");
        break;
      case "faqbocs-dark":
        setColorBg("bg-gray-700");
        setColorText("text-slate-100");
        setColorPrimary("bg-gray-900");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-gray-100");
        break;
      case "faqbocs-dark-light":
        setColorBg("bg-gray-700");
        setColorText("");
        setColorPrimary("bg-gray-50");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-gray-100");
        break;
      case "faqbocs-black-yellow":
        setColorBg("bg-gray-900");
        setColorText("");
        setColorPrimary("bg-yellow-300");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-galaxy":
        setColorBg("bg-gradient-to-t from-blue-950 to-pink-700");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-ocean":
        setColorBg("bg-gradient-to-t from-blue-800 to-teal-500 via-cyan-500");
        setColorText("");
        setColorPrimary("bg-teal-200");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-moss":
        setColorBg("bg-gradient-to-t from-yellow-800 to-lime-600");
        setColorText("");
        setColorPrimary("bg-lime-200");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-dark-smoke":
        setColorBg("bg-dark-smoke bg-right bg-cover");
        setColorText("");
        setColorPrimary("bg-gray-100");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
      case "faqbocs-light-smoke":
        setColorBg("bg-light-smoke bg-cover");
        setColorText("text-white");
        setColorPrimary("bg-gray-900");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("");
        break;
      case "faqbocs-leaves":
        setColorBg("bg-leaves bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(false);
        setColorTitle("text-white drop-shadow-md");
        break;
      case "faqbocs-flora":
        setColorBg("bg-flora bg-center bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-koi":
        setColorBg("bg-koi bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-space":
        setColorBg("bg-space bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white drop-shadow-md");
        break;
      case "faqbocs-recycle":
        setColorBg("bg-recycle bg-center bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-slate-900 text-white");
        setDark(true);
        setColorTitle("");
        break;
      case "faqbocs-forest":
        setColorBg("bg-forest bg-center bg-cover");
        setColorText("");
        setColorPrimary("bg-white");
        setColorShare("bg-slate-900 text-white");
        setDark(true);
        setColorTitle("");
        break;
    }
  }, [theme]);

  const generateURL = (type: string, url: string) => {
    switch (type) {
      case "ig":
        return "https://instagram.com/" + url;
      case "wa":
        return "https://wa.me/" + url;
      case "mail":
        return "mailto:" + url;
      default:
        if (url.includes("https://")||url.includes("http://")){
          return url;
        }else{
          return "//" + url;
        }
    }
  };

  const generateIcon = (type: string) => {
    switch (type) {
      case "ig":
        return <BsInstagram className="text-2xl text-slate-900 " />;
      case "wa":
        return <BsWhatsapp className="text-2xl text-slate-900" />;
      case "mail":
        return <FiMail className="text-2xl text-slate-900" />;
      default:
        return <FiLink className="text-2xl text-slate-900" />;
    }
  };

  const verifiedAccount = ["faqbocs", "farisyah", "ziprawan"];

  return (
    <div
      className={`flex flex-col w-[100vw] h-[100vh] sm:w-[400px] sm:h-[850px]  absolute  origin-top-left sm:scale-[0.625] 2xl:scale-[0.70] align-middle sm:max-w-md font-poppins justify-between py-7 px-5 mx-auto hidden-scrollbar overflow-scroll ${colorBg}`}
    >
      <div
        className={`fixed top-5 right-5 cursor-pointer rounded-full  w-10 h-10 flex justify-center items-center ${colorShare}`}
        onClick={() => setPopShare(true)}
      >
        <RxShare1 className="text-xl" />
      </div>
      <div
        className={`fixed top-5 left-5 cursor-pointer rounded-full ${colorShare} w-10 h-10 flex justify-center items-center`}
        onClick={() => setPopLink(true)}
      >
        <FiLink className="text-xl" />
      </div>
      <div className="mx-auto w-full flex flex-col items-center">
        <div className="relative overflow-hidden w-28 h-28 shadow-md rounded-full mt-12 z-0 ">
          <div
            className={`w-full h-full ${
              image ? "bg-white" : "bg-slate-950"
            } text-white text-5xl font-semibold flex justify-center items-center`}
          >
            {!image ? (
              session?.username![0].toUpperCase()
            ) : (
              <Image
                unoptimized
                fill
                src={image}
                alt=""
                className="object-cover"
                placeholder="blur"
              />
            )}
          </div>
        </div>
        <h1 className={`text-2xl ${colorTitle} font-semibold mt-3 text-center`}>
          {title}
        </h1>
        <p className={`${colorTitle} flex items-center gap-1`}>
          @{session.username}
          {verifiedAccount.includes(session.username!) && (
            <GoVerified className=" text-yellow-500" />
          )}
        </p>

        <section className={`w-full mt-6 ${colorText}`}>
          {dataSearched.map((faq) => (
            <AccordionItem
              key={faq.id}
              question={faq.q}
              answer={parse(faq.a)}
              colorPrimary={colorPrimary}
              preview={true}
            />
          ))}
        </section>
      </div>
      <Link
        href={"admin/"}
        className={`relative ${colorTitle} w-full flex justify-center items-center gap-2 mt-10`}
      >
        <Image src={LogoText} alt="faqbocs" height={35} />
        <p className={`font-bold font-ssp text-2xl ${dark ? "text-[#f4f4f4]" : ""}`}>Faqbocs</p>
      </Link>
      
      {popShare && (
        <button
          onClick={() => setPopShare(false)}
          className={`fixed  top-0 left-0 w-[100vw] h-[100vh] sm:w-[400px] sm:h-[850px] bg-slate-950/40 backdrop-blur-sm flex text-slate-950 z-10`}
        >
          <div
            className={`bg-white w-full flex flex-col gap-2 p-5 font-poppins h-fit rounded-t-3xl fixed bottom-0 left-0 z-20`}
          >
            <h1 className="text-lg mt-2 mb-4 font-bold flex justify-center items-center gap-1 text-center ">
              @{session.username}
              {verifiedAccount.includes(session.username!) && (
                <GoVerified className=" text-yellow-500" />
              )}
            </h1>
            <hr className="border-1 border-slate-200" />
            <div className="w-full flex flex-col gap-2 p-5 font-poppins">
              <div
                className="p-4 w-full flex font-normal cursor-pointer items-center justify-between hover:bg-slate-200 transition rounded-lg "
                onClick={() =>
                  navigator.share({
                    title: `${title} | Faqbocs`,
                    text: `${title} by ${session.username}\nCheck out my faqbocs!\n\n`,
                    url: `https://faqbocs.com/${session.username}`,
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
                className="p-4 w-full  flex font-normal justify-between cursor-pointer items-center hover:bg-slate-200 transition rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `faqbocs.com/${session.username}`
                  );
                  alert("Link Copied!");
                }}
              >
                <div className="flex gap-3 items-center">
                  <FiLink className="text-xl" />
                  <p>Copy this Faqbocs link</p>
                </div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
            </div>
          </div>
        </button>
      )}
      {popLink && (
        <button
          onClick={() => setPopLink(false)}
          className={`fixed  top-0 left-0 w-[100vw] h-[100vh] sm:w-[400px] sm:h-[850px] bg-slate-950/40 backdrop-blur-sm flex text-slate-950 z-10`}
        >
          <div
            className={`bg-white w-full flex flex-col gap-2 p-5 font-poppins h-fit rounded-t-3xl absolute bottom-0 left-0 z-20`}
          >
            <h1 className="text-lg mt-2 mb-4 font-bold flex justify-center items-center gap-1 text-center">
              Links
            </h1>
            <hr className="border-1 border-slate-200" />
            <div className="w-full flex flex-col gap-2 p-5 font-poppins max-h-[70vh] overflow-y-auto">
              {link.length !== 0 ? link.map(({ url, title, urlType }: ILink, idx) => {
                return (
                  <a
                    rel="noopener"
                    key={`link_${idx}`}
                    href={generateURL(urlType, url)}
                    target="_blank"
                    className="p-4 w-full flex font-normal cursor-pointer items-center justify-between hover:bg-slate-200 transition rounded-lg"
                  >
                    <div className="flex items-center gap-5 font-semibold">
                      {generateIcon(urlType)}
                      {title}
                    </div>
                    <HiOutlineChevronRight className="text-2xl" />
                  </a>
                );
              }) : (
                <div className=" w-full flex font-normal cursor-pointer items-center justify-center text-slate-900 rounded-lg">
                  There is no link yet
                </div>
              )}
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
