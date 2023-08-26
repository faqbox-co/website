import { Collapse } from "react-collapse";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import IProp from "@/interfaces/prop";
import { FiChevronDown } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function AccordionItem({
  question,
  answer,
  colorPrimary,
  preview,
}: IProp) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <div className={`rounded-3xl w-full shadow-md ${colorPrimary}`}>
        <div
          className={`px-5 py-3 flex justify-between items-center align-middle cursor-pointer gap-3`}
          onClick={() => setOpen(!open)}
        >
          <p
            className={`font-poppins w-[90%] ${
              !preview ? "sm:text-lg" : ""
            } font-semibold break-words`}
          >
            {question}
          </p>
          <HiOutlineChevronDown 
            className={`w-[10%] text-2xl transition duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
          
          {/* {open ? (
            <AiOutlineMinus className="w-[10%] sm:text-lg" />
          ) : (
            <AiOutlinePlus className="w-[10%] sm:text-lg" />
          )} */}
        </div>
        <Collapse isOpened={open}>
          <div
            className={`font-poppins pb-3 px-5 transition text-sm ${
              !preview ? "sm:text-base" : ""
            } font-normal break-words`}
          >
            {answer}
          </div>
        </Collapse>
      </div>
    </div>
  );
}
