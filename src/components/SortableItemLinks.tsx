import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { CiTrash, CiEdit } from "react-icons/ci";
import { FiCheck, FiLink, FiMail } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import parse from "html-react-parser";
import TiptapEdit from "./TiptapEdit";
import ILink from "@/interfaces/links";
import { FaLink } from "react-icons/fa";
import { BsInstagram, BsLink, BsWhatsapp } from "react-icons/bs";

type ItemProps = {
  link: ILink[];
  setLink: React.Dispatch<React.SetStateAction<ILink[]>>;
  id: string;
  url: string;
  title: string;
  urlType: string;
  handleDelete: (id: string) => void;
};

export default function SortableItemLinks({
  link,
  setLink,
  id,
  url,
  title,
  urlType,
  handleDelete,
}: ItemProps) {
  function animateLayoutChanges(args: any) {
    const { isSorting, wasDragging } = args;

    if (isSorting || wasDragging) {
      return defaultAnimateLayoutChanges(args);
    }

    return true;
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ animateLayoutChanges, id: id });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const generateIcon = (type:string) => {
    switch(type){
      case("ig"):
        return <BsInstagram className="text-2xl text-slate-100"/>;
      case("wa"):
        return <BsWhatsapp className="text-2xl text-slate-100"/>;
      case("mail"):
        return <FiMail className="text-2xl text-slate-100"/>;
      default:
        return <FiLink className="text-2xl text-slate-100"/>;
    }
  }

  const [showAnswer, setShowAnswer] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newURL, setNewURL] = useState(url);
  const [urlValid, setUrlValid] = useState(true);
  const [empty, setEmpty] = useState(false);

  const handleSubmitEdit = (id: string) => {
    const pattern: {[key: string]: RegExp} = {
      ig: /(.*)/g,
      url: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
      wa: /\+(0-9)*/g,
      mail: /(.*)/g 
    };
    
    if (!newURL.trim() && !newTitle.trim()) {
      setEmpty(true);
    } else if (!pattern[urlType].test(newURL)) {
      setUrlValid(false);
      setEmpty(false);
    } else {
      setLink(
        link.map((item) =>
          item.id === id
            ? { ...item, url: newURL, title: newTitle }
            : { ...item }
        )
      );
      setEdit(false);
      setUrlValid(true);
    }
  };

  const handleCancelEdit = () => {
    setNewTitle(title);
    setNewURL(url);
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        className={`font-poppins cursor-default w-full shadow-sm bg-white  flex ${
          deleteConfirm ? "rounded-t-2xl" : "sm:mb-4 mb-3 rounded-2xl"
        } transition duration-300 group`}
      >
        {!edit && (
          <span className="sm:w-14 w-10 touch-none flex cursor-grab active:cursor-grabbing">
            <RxDragHandleDots2 className="text-lg lg:text-xl m-auto" />
          </span>
        )}
        <div
          className={`w-full sm:pr-7 pr-5 ${
            edit ? "sm:pl-7 pl-5" : "pl-2 flex justify-between items-center"
          } `}
        >
          {!edit && (
            <>
              <div className="flex gap-5 items-center">
                <div className="sm:p-5 p-4 bg-slate-800 rounded-full">
                  {generateIcon(urlType)}
                </div>
                <div>
                  <div className="sm:text-lg font-semibold mb-2 mt-5 ">
                    {title}
                  </div>
                  <div className="sm:text-base mb-5 text-sm relative break-words text-slate-500">
                    {url}
                  </div>
                </div>
              </div>
            </>
          )}
          {edit && (
            <div className="font-poppins cursor-default w-full bg-white rounded-t-xl flex flex-col mt-5 group gap-2">
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
                spellCheck="false"
                placeholder="https://www.example.com"
                value={newURL}
                onChange={(e) => {
                  setNewURL(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {e.preventDefault();document.getElementById("link-title")?.focus();}
                }}
              />
              {!urlValid && (
                <p className="text-red-500 text-sm">Enter a valid URLs.</p>
              )}

              <label
                htmlFor="question"
                className="mt-2 sm:text-lg font-semibold"
              >
                Title
              </label>

              <input
                type="text"
                name="link-title"
                id="link-title"
                className="sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full"
                autoComplete="off"
                spellCheck="false"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {handleSubmitEdit(id)}
                }}
              />
              {empty && (
                <p className="text-red-500 text-sm">
                  Fill up the URL and Title.
                </p>
              )}
            </div>
          )}

          {/* {deleteConfirm && (
            <div
              className={`bg-white cursor-default flex flex-wrap font-poppins text-sm sm:text-base items-center gap-2 py-2  rounded-b-xl overflow-hidden  transition duration-500`}
            >
              <p>Delete this forever?</p>
              <button
                className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition"
                onClick={() => {
                  setDeleteConfirm(false);
                  setShowAnswer(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-100 py-2 px-3 hover:bg-red-500 hover:text-white rounded-full text-red-600 transition"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          )} */}

          {edit && (
            <div className="bg-white cursor-default rounded-b-xl flex gap-2 font-poppins text-sm sm:text-base py-2 my-2 ">
              <button
                className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition"
                onClick={() => {
                  setEdit(false);
                  handleCancelEdit();
                }}
              >
                Cancel
              </button>
              <button
                className="py-2 px-3 relative rounded-full transition bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white flex items-center gap-1"
                onClick={() => {
                  handleSubmitEdit(id);
                }}
              >
                Save
                <FiCheck className="text-lg" />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>
            </div>
          )}

          {!edit && !deleteConfirm && (
            <div className="bg-white cursor-default rounded-b-2xl flex gap-2 font-poppins sm:py-2 py-1">
              <button
                className="p-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
                onClick={() => {
                  setEdit(true);
                  setDeleteConfirm(false);
                }}
              >
                <CiEdit className="sm:text-2xl text-xl" />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>

              <button
                className="p-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
                onClick={() => {
                  setDeleteConfirm(true);
                  setShowAnswer(true);
                }}
              >
                <CiTrash className="sm:text-2xl text-xl" />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>
            </div>
          )}
        </div>
      </div>
      {deleteConfirm && (
        <div
          className={`bg-orange-200  cursor-default justify-center flex flex-wrap font-poppins text-sm sm:text-base items-center gap-2 py-2 rounded-b-xl overflow-hidden transition duration-500 sm:mb-4 mb-3`}
        >
          <p>Delete this forever?</p>
          <button
            className="bg-slate-50 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition"
            onClick={() => {
              setDeleteConfirm(false);
              setShowAnswer(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-100 py-2 px-3 hover:bg-red-500 hover:text-white rounded-full text-red-600 transition"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
