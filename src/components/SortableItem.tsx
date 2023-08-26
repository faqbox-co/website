import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { CiTrash, CiEdit } from "react-icons/ci";
import { FiCheck } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import parse from "html-react-parser";
import TiptapEdit from "./TiptapEdit";
import IData from "@/interfaces/data";

type ItemProps = {
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
  id: string;
  q: string;
  a: string;
  handleDelete: (id: string) => void;
};

export default function SortableItem({
  data,
  setData,
  id,
  q,
  a,
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

  const [showAnswer, setShowAnswer] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newAnswer, setNewAnswer] = useState(a);
  const [newQuestion, setNewQuestion] = useState(q);

  const handleSubmitEdit = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, q: newQuestion, a: newAnswer } : { ...item }
      )
    );
  };

  const handleCancelEdit = () => {
    setNewAnswer(a);
    setNewQuestion(q);
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
          className={`w-full sm:pr-7 pr-5 ${edit ? "sm:pl-7 pl-5" : "pl-2"}`}
        >
          {!edit && (
            <>
              <div className="sm:text-lg font-semibold mb-2 mt-5 ">{q}</div>
              {showAnswer && (
                <div className="sm:text-base mb-3 text-sm relative break-words">
                  {parse(a)}
                </div>
              )}
            </>
          )}
          {edit && (
            <div className="font-poppins cursor-default w-full bg-white rounded-t-xl flex flex-col mt-5 group gap-2">
              <label htmlFor="question" className="sm:text-lg font-semibold">
                Question
              </label>
              <input
                type="text"
                name="question"
                id="question"
                className="sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full"
                autoComplete="off"
                autoFocus
                spellCheck="false"
                placeholder="Question..."
                value={newQuestion}
                onChange={(e) => {
                  setNewQuestion(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />

              <label
                htmlFor="question"
                className="mt-2 sm:text-lg font-semibold"
              >
                Answer
              </label>
              <TiptapEdit newAnswer={newAnswer} setNewAnswer={setNewAnswer} />
            </div>
          )}

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
                  setEdit(false);
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
                className="p-2 relative flex gap-1 items-center text-sm rounded-md transition hover:bg-gray-100 font-normal"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                Answer
                <SlArrowDown
                  className={`transition duration-300 ${
                    showAnswer ? "rotate-180" : "rotate-0"
                  }`}
                />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>

              <button
                className="p-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
                onClick={() => {
                  setEdit(true);
                  setDeleteConfirm(false);
                }}
              >
                <CiEdit className="text-xl" />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>

              <button
                className="p-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
                onClick={() => {
                  setDeleteConfirm(true);
                  setShowAnswer(true);
                }}
              >
                <CiTrash className="text-xl" />
                <div className="w-full h-full absolute top-0 right-0"></div>
              </button>
            </div>
          )}
        </div>
      </div>
      {deleteConfirm && (
        <div
          className={`bg-orange-200 justify-center cursor-default flex flex-wrap font-poppins text-sm sm:text-base items-center gap-2 py-2  rounded-b-xl overflow-hidden  transition duration-500 sm:mb-4 mb-3`}
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
      )}
    </div>
  );
}
