import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { RxShare1 } from "react-icons/rx";
import { GoVerified } from "react-icons/go";
import { useState, useEffect, useContext } from "react";
import AccordionItem from "./AccordionItem";
import parse from "html-react-parser";
import DataContext, { DataContextProps } from "@/context/DataContext";
import Link from "next/link";
import LogoText from "../assets/logo-light.png";
import LogoTextDark from "../assets/logo-dark.png";
import CustomSession from "@/@types/custom_session";
import IData from "@/interfaces/data";

export default function FaqbocsPreview({
  props,
}: {
  props: React.ReactElement["props"];
}) {
  const { data, theme, title, image } = useContext(
    DataContext
  ) as DataContextProps;
  const session = props.data as CustomSession;

  const [search, setSearch] = useState("");
  const [dataSearched, setDataSearched] = useState<IData[]>(data);

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
  const [colorDark, setColorDark] = useState("");
  const [colorPrimary, setColorPrimary] = useState("");
  const [colorShare, setColorShare] = useState("");
  const [dark, setDark] = useState(false);
  const [colorTitle, setColorTitle] = useState("");

  useEffect(() => {
    switch (theme) {
      case "faqbocs-monochrome":
        setColorBg("bg-white");
        setColorText("");
        setColorDark("bg-slate-900 text-white hover:bg-slate-800");
        setColorPrimary("bg-gray-100");
        setColorShare("bg-slate-900 text-white");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-blue-sky":
        setColorBg("bg-sky-200");
        setColorText("");
        setColorDark("bg-blue-600 text-white hover:bg-blue-700");
        setColorPrimary("bg-white");
        setColorShare("bg-slate-900 text-white");
        setDark(false);
        setColorTitle("");
        break;
      case "faqbocs-dark":
        setColorBg("bg-slate-800");
        setColorText("text-gray-100");
        setColorDark("bg-gray-900 text-white hover:bg-gray-950");
        setColorPrimary("bg-gray-950");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-gray-100");
        break;
      case "faqbocs-galaxy":
        setColorBg("bg-gradient-to-t from-blue-950 to-pink-700");
        setColorText("");
        setColorDark("bg-pink-600 text-white hover:bg-pink-700");
        setColorPrimary("bg-white");
        setColorShare("bg-gray-100 text-slate-950");
        setDark(true);
        setColorTitle("text-white");
        break;
    }
  }, [theme]);

  const verifiedAccount = ["faqbocs", "farisyah", "ziprawan"];

  return (
    <div
      className={`flex flex-col w-[100vw] h-[100vh] sm:w-[400px] sm:h-[850px]  absolute  origin-top-left sm:scale-[0.625] 2xl:scale-[0.875] align-middle sm:max-w-md font-poppins justify-between py-7 px-5 mx-auto hidden-scrollbar overflow-scroll ${colorBg} ${colorText}`}
    >
      <div
        className={`fixed top-5 right-5 cursor-pointer rounded-full  w-10 h-10 flex justify-center items-center ${colorShare}`}
      >
        <RxShare1 className="text-xl" />
      </div>
      <div className="mx-auto w-full flex flex-col items-center">
        <div className="relative overflow-hidden w-24 h-24 sm:w-28 sm:h-28 shadow-md rounded-full mt-3 z-0 ">
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
              />
            )}
          </div>
        </div>
        <h1 className={`text-2xl ${colorTitle} font-semibold mt-3 text-center`}>
          {title}
        </h1>
        <p className={`${colorTitle} flex items-center gap-1`}>
          @{session.username}
          {verifiedAccount.includes(session.username!) && <GoVerified className=" text-yellow-500"/>}
        </p>
        <div
          className={`${colorPrimary}  transitions duration-300  text-sm rounded-full font-poppins px-5 py-3  mt-5  max-w-md  flex justify-between gap-3 items-center w-full shadow-sm`}
        >
          <BiSearch className="text-xl" />
          <input
            id="search"
            type="text"
            className=" w-full transitions duration-300  outline-none bg-transparent "
            placeholder="Search..."
            autoComplete="off"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button
          className={`${colorDark} rounded-full w-full py-2 px-5 mt-3 font-semibold shadow-sm`}
        >
          More question?
        </button>
        <section className="w-full">
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
        <Image src={dark ? LogoTextDark : LogoText} alt="faqbocs" height={30} />
        <p className=" text-xl font-medium">Faqbocs</p>
      </Link>
    </div>
  );
}
