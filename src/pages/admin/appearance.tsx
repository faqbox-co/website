import Head from "next/head";
import Image from "next/image";
import React, { useContext } from "react";

import AdminLayout from "@/components/AdminLayout";
import DataContext from "@/context/DataContext";
import CustomSession from "@/@types/custom_session";

interface ITheme {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Appearance({ data }: { data: CustomSession }) {
  const { theme, setTheme, title, setTitle, image, setImage } = useContext(
    DataContext
  ) as ITheme;

  const wrapperGenerator = (itemsTheme: string) => {
    if (theme === itemsTheme) {
      return "flex justify-center items-center rounded-xl border-4 border-gray-600";
    } else {
      return "flex justify-center items-center rounded-xl";
    }
  };

  const selectGenerator = (itemsTheme: string) => {
    if (theme === itemsTheme) {
      return "w-full aspect-[9/16] px-3 flex flex-col justify-center gap-2 rounded-xl scale-90 border-2 border-gray-200";
    } else {
      return "w-full aspect-[9/16] px-3 flex flex-col justify-center gap-2 rounded-xl";
    }
  };

  async function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = event.target.files![0];

    const allowedType = ["image/jpeg", "image/png", "image/gif"];

    reader.onload = async (event) => {
      if (file.size > 2 << 19) {
        alert("File too big!");
      } else if (!allowedType.includes(file.type)) {
        alert("File type not supported.");
      } else {
        const res = event.target?.result;
        if (typeof res === "string") setImage(res);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <>
      <Head>
        <title>Faqbocs Admin</title>
      </Head>
      <div className=" sm:w-full max-w-3xl w-[95%] sm:m-0 mx-auto relative z-10">
        <h1 className="hidden sm:block font-ssp text-4xl font-black text-center ">
          Appearance
        </h1>
        <div className="w-full p-5 sm:p-10 flex font-poppins flex-col bg-white shadow-md rounded-2xl sm:mt-5 mt-20 relative">
          <h1 className="text-lg font-bold mb-3">Header</h1>
          <div className="w-full sm:flex relative sm:flex-row gap-5">
            <div className="w-28 h-28 mb-3 sm:mb-0 rounded-full mx-auto sm:m-0 overflow-hidden">
              <div
                className={`relative overflow-hidden w-28 h-28 ${
                  image ? "bg-transparent" : "bg-slate-950"
                } text-white flex justify-center items-center text-5xl font-semibold`}
              >
                {!image ? (
                  data.username![0].toUpperCase()
                ) : (
                  <Image
                    unoptimized
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <div className=" sm:w-[70%] mx-auto sm:m-0 flex flex-col justify-center gap-3">
              <label className="rounded-full bg-blue-600 text-white font-semibold text-center py-2 hover:bg-blue-700 cursor-pointer">
                Choose an image
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  className="hidden"
                  onChange={onImageChange}
                />
              </label>
              <button
                className="rounded-full border-2 border-gray-200 font-semibold text-center hover:bg-gray-200 py-2"
                onClick={() => {
                  if (!image) {
                    return alert("Bro want to remove the removed image 💀");
                  }
                  const choice = confirm("You sure want to remove image?");
                  if (choice) {
                    setImage("");
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="p-5 mt-5 bg-gray-100 rounded-2xl">
            <h1 className="font-semibold">Title</h1>
            <input
              className="bg-transparent outline-none py-1 w-full"
              type="text"
              name="title"
              id="title"
              placeholder={"What's the title?"}
              onChange={(e) => {
                const value = e.target.value;
                if (value) setTitle(value);
                else console.warn("Title cannot be empty!");
              }}
              value={title}
            />
          </div>
        </div>
        <div className="w-full h-fit p-5 sm:p-10 flex font-poppins flex-col bg-white shadow-md rounded-2xl mt-3 sm:mt-5 mb-10 relative">
          <h1 className="text-lg font-bold mb-3">Themes</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 cursor-pointer">
            <div onClick={() => setTheme("faqbocs-monochrome")}>
              <div className={wrapperGenerator("faqbocs-monochrome")}>
                <div
                  className={`bg-white border-2 border-gray-300 ${selectGenerator(
                    "faqbocs-monochrome"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-200 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Default</h2>
            </div>
            <div onClick={() => setTheme("faqbocs-blue-sky")}>
              <div className={wrapperGenerator("faqbocs-blue-sky")}>
                <div
                  className={`bg-blue-600 ${selectGenerator(
                    "faqbocs-blue-sky"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Blue</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-grass")}>
              <div className={wrapperGenerator("faqbocs-grass")}>
                <div
                  className={`bg-green-500 ${selectGenerator(
                    "faqbocs-grass"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Green</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-red")}>
              <div className={wrapperGenerator("faqbocs-red")}>
                <div
                  className={`bg-red-500 ${selectGenerator(
                    "faqbocs-red"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Red</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-pink")}>
              <div className={wrapperGenerator("faqbocs-pink")}>
                <div
                  className={`bg-pink-500 ${selectGenerator(
                    "faqbocs-pink"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Pink</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-blue-reverse")}>
              <div className={wrapperGenerator("faqbocs-blue-reverse")}>
                <div
                  className={`bg-white border-2 border-gray-300 ${selectGenerator(
                    "faqbocs-blue-reverse"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-blue-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-blue-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-blue-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-blue-600 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Blue Reverse</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-green-reverse")}>
              <div className={wrapperGenerator("faqbocs-green-reverse")}>
                <div
                  className={`bg-white border-2 border-gray-300 ${selectGenerator(
                    "faqbocs-green-reverse"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-green-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-green-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-green-600 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-green-600 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Blue Reverse</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-black")}>
              <div className={wrapperGenerator("faqbocs-black")}>
                <div
                  className={`bg-gray-900 ${selectGenerator(
                    "faqbocs-black"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-700 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-700 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-700 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-700 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Black</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-black-white")}>
              <div className={wrapperGenerator("faqbocs-black-white")}>
                <div
                  className={`bg-gray-900 ${selectGenerator(
                    "faqbocs-black-white"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Black & White</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-dark")}>
              <div className={wrapperGenerator("faqbocs-dark")}>
                <div
                  className={`bg-gray-700 ${selectGenerator(
                    "faqbocs-dark"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Dark</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-dark-light")}>
              <div className={wrapperGenerator("faqbocs-dark-light")}>
                <div
                  className={`bg-gray-700 ${selectGenerator(
                    "faqbocs-dark-light"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-50 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Dark & Light</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-black-yellow")}>
              <div className={wrapperGenerator("faqbocs-black-yellow")}>
                <div
                  className={`bg-gray-900 ${selectGenerator(
                    "faqbocs-black-yellow"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-yellow-300 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-yellow-300 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-yellow-300 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-yellow-300 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Black & Yellow</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-galaxy")}>
              <div className={wrapperGenerator("faqbocs-galaxy")}>
                <div
                  className={`bg-gradient-to-t from-blue-950 to-pink-700 ${selectGenerator(
                    "faqbocs-galaxy"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Galaxy</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-ocean")}>
              <div className={wrapperGenerator("faqbocs-ocean")}>
                <div
                  className={`bg-gradient-to-t from-blue-800 to-teal-500 via-cyan-500 ${selectGenerator(
                    "faqbocs-ocean"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-teal-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-teal-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-teal-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-teal-200 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Ocean</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-moss")}>
              <div className={wrapperGenerator("faqbocs-moss")}>
                <div
                  className={`bg-gradient-to-t from-yellow-800 to-lime-600  ${selectGenerator(
                    "faqbocs-moss"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-lime-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-lime-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-lime-200 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-lime-200 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Moss</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-dark-smoke")}>
              <div className={wrapperGenerator("faqbocs-dark-smoke")}>
                <div
                  className={`bg-dark-smoke bg-right bg-cover ${selectGenerator(
                    "faqbocs-dark-smoke"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-100 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-100 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-100 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-100 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Dark Smoke</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-light-smoke")}>
              <div className={wrapperGenerator("faqbocs-light-smoke")}>
                <div
                  className={`bg-light-smoke bg-cover ${selectGenerator(
                    "faqbocs-light-smoke"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-gray-900 shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Light Smoke</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-leaves")}>
              <div className={wrapperGenerator("faqbocs-leaves")}>
                <div
                  className={`bg-leaves bg-cover ${selectGenerator(
                    "faqbocs-leaves"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Leaves</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-koi")}>
              <div className={wrapperGenerator("faqbocs-koi")}>
                <div
                  className={`bg-koi bg-cover ${selectGenerator(
                    "faqbocs-koi"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Koi</h2>
            </div>

            <div onClick={() => setTheme("faqbocs-space")}>
              <div className={wrapperGenerator("faqbocs-space")}>
                <div
                  className={`bg-space bg-cover ${selectGenerator(
                    "faqbocs-space"
                  )}`}
                >
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                  <div className="w-full h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
              <h2 className="font-poppins text-base mt-2 text-center">Space</h2>
            </div>
            
            

            {/* <div className="h-fit relative text-center">
              <input
                id="faqbocs-monochrome"
                type="radio"
                name="theme"
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer peer"
                value={"faqbocs-monochrome"}
                checked={theme === "faqbocs-monochrome"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="w-full h-full bg-white border-2 border-slate-200 flex flex-col gap-3 justify-center items-center rounded-2xl peer-checked:scale-90 peer-checked:border-slate-900  mb-2 p-8">
                <div className="w-full h-8 max-w-xs bg-slate-900 rounded-full shadow-sm"></div>
                <div className="w-full h-8 max-w-xs bg-gray-100 rounded-full shadow-md"></div>
              </div>
              <div></div>
              <label htmlFor="faqbocs-monochrome">Basic</label>
            </div>
            <div className="h-fit relative text-center">
              <input
                id="faqbocs-blue-sky"
                type="radio"
                name="theme"
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer peer"
                value={"faqbocs-blue-sky"}
                checked={theme === "faqbocs-blue-sky"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="w-full h-full bg-sky-200 border-2 border-slate-200 flex flex-col gap-3 justify-center items-center rounded-2xl peer-checked:scale-90 peer-checked:border-slate-900 mb-2 p-8 ">
                <div className="w-full h-8 max-w-xs bg-blue-600 rounded-full shadow-sm"></div>
                <div className="w-full h-8 max-w-xs bg-white rounded-full shadow-md"></div>
              </div>
              <label htmlFor="faqbocs-blue-sky">Blue Sky</label>
            </div>
            <div className="h-fit relative text-center">
              <input
                id="faqbocs-dark"
                type="radio"
                name="theme"
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer peer"
                value={"faqbocs-dark"}
                checked={theme === "faqbocs-dark"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="w-full h-full bg-slate-800 border-2 border-slate-200 flex flex-col gap-3 justify-center items-center rounded-2xl peer-checked:scale-90 peer-checked:border-slate-900 mb-2 p-8 ">
                <div className="w-full h-8 max-w-xs bg-gray-900 rounded-full shadow-sm"></div>
                <div className="w-full h-8 max-w-xs bg-gray-950 rounded-full shadow-md"></div>
              </div>
              <label htmlFor="faqbocs-dark">Dark</label>
            </div>
            <div className="h-fit relative text-center">
              <input
                id="faqbocs-galaxy"
                type="radio"
                name="theme"
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer peer"
                value={"faqbocs-galaxy"}
                checked={theme === "faqbocs-galaxy"}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="w-full h-full bg-gradient-to-t from-blue-950 to-pink-700 border-2 border-slate-200 flex flex-col gap-3 justify-center items-center rounded-2xl peer-checked:scale-90 peer-checked:border-slate-900 mb-2 p-8 ">
                <div className="w-full h-8 max-w-xs bg-pink-600 rounded-full shadow-sm"></div>
                <div className="w-full h-8 max-w-xs bg-gray-100 rounded-full shadow-md"></div>
              </div>
              <label htmlFor="faqbocs-galaxy">Galaxy</label>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

Appearance.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export { default as getServerSideProps } from "@/utils/checkUname";
