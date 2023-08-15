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
import DataContext from "@/context/DataContext";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import randomID from "@/utils/randomid";
import ILink from "@/interfaces/links";
import SortableItemLinks from "@/components/SortableItemLinks";

type DataType = {
  link: ILink[];
  setLink: React.Dispatch<
    React.SetStateAction<{ id: string; url: string; title: string }[]>
  >;
};

const Links: NextPageWithLayout = () => {
  const { link, setLink } = useContext(DataContext) as DataType;
  const [addQuestion, setAddQuestion] = useState(false);
  const sensors = [useSensor(SmartPointerSensor)];
  const [newURL, setNewURL] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [empty, setEmpty] = useState(false);
  const [urlValid, setUrlValid] = useState(true);

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

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

  const handleSumbit = (e: any) => {
    e.preventDefault();
    const pattern =  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    if (!newURL.trim() || !newTitle.trim() ) {
      setEmpty(true);
    } else if (!pattern.test(newURL)) {
      setUrlValid(false);
      setEmpty(false);
    }else{
      setAddQuestion(!addQuestion);
      setLink([{ id: randomID(), url: newURL, title: newTitle }, ...link]);
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

        {!addQuestion && (
          <button
            className="bg-blue-600 sm:mt-5 mt-20 mb-3 sm:mb-5 hover:bg-blue-800 flex justify-center items-center py-3 px-3 w-full transition font-poppins font-semibold gap-1 rounded-2xl text-slate-50 relative z-0"
            onClick={() => setAddQuestion(!addQuestion)}
          >
            <HiPlus className="text-xl" />
            Add Links
          </button>
        )}
        {addQuestion && (
          <form
            onSubmit={handleSumbit}
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
              URL
            </label>

            <input
              type="text"
              name="link-url"
              id="link-url"
              className="sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full"
              autoComplete="off"
              autoFocus
              placeholder="https://www.example.com"
              value={newURL}
              onChange={(e) => {
                setNewURL(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            {!urlValid && (
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
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
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
        )}

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
