import SortableItem from "@/components/SortableItem";
import { HiPlus } from "react-icons/hi";
import {
  DndContext,
  closestCenter,
  MeasuringStrategy,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { SmartPointerSensor } from "@/utils/helper";
import Tiptap from "@/components/Tiptap";
import AdminLayout from "@/components/AdminLayout";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import DataContext, { DataContextProps } from "@/context/DataContext";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import randomID from "@/utils/randomid";
import ILink from "@/interfaces/links";
import SortableItemLinks from "@/components/SortableItemLinks";
import { BsGlobe, BsInstagram, BsLink, BsWhatsapp } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import {FiLink, FiMail} from "react-icons/fi";

const Links: NextPageWithLayout = () => {
  const { link, setLink } = useContext(DataContext) as DataContextProps;
  const [addQuestion, setAddQuestion] = useState(false);
  const sensors = [useSensor(SmartPointerSensor)];
  const [newURL, setNewURL] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [empty, setEmpty] = useState(false);
  const [urlValid, setUrlValid] = useState(true);
  const [popupType, setPopupType] = useState(false);
  const [urlType, setUrlType] = useState("");
  const [urlBuffer, setUrlBuffer] = useState("");

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const urlTypeObj: { [key: string]: {name: string; urlPrompt: string; placeholder: string;} } = {
    ig: {
      name: "ig",
      urlPrompt: "Your IG",
      placeholder: "@username",
    },
    wa: {
      name: "wa",
      urlPrompt: "Your Number",
      placeholder: "Use International Format",
    },
    url: {
      name: "url",
      urlPrompt: "URL",
      placeholder: "https://www.example.com",
    },
    mail: {
      name: "mail",
      urlPrompt: "Your Email",
      placeholder: "example@gmail.com"
    }
  };

  const generateLinkForm = (type: {name:string; urlPrompt: string; placeholder: string }) => {
    return (
      <>
        <form
          onSubmit={_ => handleSumbit(_, type)}
          className={`w-full sm:p-7 p-5 flex font-poppins shadow-sm flex-col bg-white  rounded-2xl gap-2 sm:mt-5 mt-20 mb-3 relative`}
        >
          <button
            className="h-8 w-8 rounded-full flex justify-center items-center text-slate-900 hover:bg-gray-200 transition  text-xl p-0 absolute top-2 right-2"
            onClick={() => {
              setAddQuestion(false);
              setEmpty(false);
              setNewURL("");
              setNewTitle("");
            }}
          >
            <RxCross1 className="text-xl" />
          </button>

          <label htmlFor="question" className="sm:text-lg font-semibold">
            {type.urlPrompt}
          </label>

          <input
            type="text"
            name="link-url"
            id="link-url"
            className="sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full"
            autoComplete="off"
            autoFocus
            placeholder={type.placeholder}
            value={newURL}
            onChange={(e) => {
              setNewURL(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {e.preventDefault();document.getElementById("link-title")?.focus();}
            }}
          />

          {!urlValid && (type.name === "url") && (
            <p className="text-red-500 text-sm">
              Enter a valid URLs.
            </p>
          )}

          <label htmlFor="question" className="mt-2 sm:text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            name="link-title"
            id="link-title"
            className="sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full"
            autoComplete="off"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onKeyDown={(e:any) => {
              if (e.key === "Enter") {handleSumbit(e, type)};
            }}
          />
          
          {empty && (
            <p className="text-red-500 text-sm">
              Fill up the URL and Title.
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-slate-50 py-3 px-4 rounded-2xl font-semibold items-center w-fit flex gap-2 mt-3"
          >
            Add <HiPlus className="text-lg" />
          </button>
        </form>
      </>
    )
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLink((items) => {
        const activeIndex = items.map((item) => item.id).indexOf(active.id);
        const overIndex = items.map((item) => item.id).indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleSumbit = (e:any, type: {name:string; urlPrompt: string; placeholder: string}) => {
    e.preventDefault();
    const pattern: {[key: string]: RegExp} = {
      ig: /(.*)/g,
      url: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
      wa: /\+(0-9)*/g,
      mail: /(.*)/g 
    };

    if (!newURL.trim() || !newTitle.trim() ) {
      setEmpty(true);
    } else if (!pattern[type.name].test(newURL)) {
      setUrlValid(false);
      setEmpty(false);
    }else{
      setAddQuestion(!addQuestion);
      setLink([{ id: randomID(), url: newURL, title: newTitle, urlType: type.name }, ...link]);
      setNewURL("");
      setNewTitle("");
      setUrlValid(true);
    }
  };


  const handleDelete = (id: string) => {
    setLink(link.filter((item) => item.id !== id));
  };

  return (
    <>
      <Head>
        <title>Faqbocs Admin</title>
      </Head>
      <div className=" sm:w-full max-w-3xl w-[95%] sm:m-0 pb-8 sm:pb-0 mx-auto relative z-10">
        <h1 className="hidden sm:block font-poppins text-3xl font-semibold text-center ">
          Links
        </h1>

        {!addQuestion && !popupType && (
          <button
            className="bg-blue-600 sm:mt-5 mt-20 mb-3 sm:mb-5 hover:bg-blue-800 flex justify-center items-center py-3 px-3 w-full transition font-poppins font-semibold gap-1 rounded-2xl text-slate-50 relative z-0"
            onClick={() => setPopupType(!popupType)}
          >
            <HiPlus className="text-xl" />
            Add Links
          </button>
        )}
        {popupType && (
          <div className="bg-white sm:mt-5 mt-20 flex items-center justify-around shadow-sm w-full p-3 rounded-2xl mb-3 relative font-poppins">
            <button onClick={() => {setAddQuestion(true);setPopupType(false);setUrlType("ig");setNewTitle("My Instagram")}} className="p-2 rounded-full bg-purple-800">
              <BsInstagram className="text-2xl text-white"/>
            </button>
            <button onClick={() => {setAddQuestion(true);setPopupType(false);setUrlType("wa");setNewTitle("My Whatsapp")}} className="p-2 rounded-full bg-green-600">
              <BsWhatsapp className="text-2xl text-white"/>
            </button>
            <button onClick={() => {setAddQuestion(true);setPopupType(false);setUrlType("mail");setNewTitle("My Email")}} className="p-2 rounded-full bg-red-600">
              <FiMail className="text-2xl text-white"/>
            </button>
            <button onClick={() => {setAddQuestion(true);setPopupType(false);setUrlType("url")}} className="p-2 rounded-full bg-slate-800">
              <FiLink className="text-2xl text-white"/>
            </button>
            <button className="p-2 rounded-xl bg-slate-200 font-semibold text-sm"
              onClick={() => setPopupType(!popupType)}>Cancel</button>
          </div>
        )}

        {addQuestion && generateLinkForm(urlTypeObj[urlType])}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          measuring={measuringConfig}
          modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
        >
          <SortableContext items={link} strategy={verticalListSortingStrategy}>
            {link.map((item) => (
              <SortableItemLinks
                link={link}
                setLink={setLink}
                handleDelete={handleDelete}
                key={item.id}
                {...item}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

Links.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export { default as getServerSideProps } from "@/utils/checkUname";

export default Links;
