import { Collapse } from "react-collapse";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import IProp from "@/interfaces/prop";

export default function FAQhome({ question, answer }: IProp) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 text-white font-ssp sm:text-2xl text-xl">
      <div className={`rounded-3xl w-full shadow-md bg-slate-900`}>
        <div
          className={`px-5 py-6 flex justify-between items-center align-middle cursor-pointer gap-5`}
          onClick={() => setOpen(!open)}
        >
          <p className="font-poppins w-[90%] font-semibold">{question}</p>
          <AiOutlinePlus
            className={`w-[10%] text-3xl transition duration-300 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          />
          {/* {open ? (
            <AiOutlineMinus className="w-[10%] font-bold" />
          ) : (
            <AiOutlinePlus className="w-[10%]" />
          )} */}
        </div>
        <Collapse isOpened={open}>
          <div className="font-poppins text-left pb-6 px-5 transition font-medium text-white ">
            <div className="rounded-xl bg-slate-600 sm:text-xl text-base p-5">
              {answer}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
