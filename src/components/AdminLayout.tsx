import AdminNav from "./AdminNav";
import FaqbocsPreview from "./FaqbocsPreview";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="font-popppins">
      <AdminNav props={children.props} />
      <div className="sm:mt-[60px] min-h-[100vh] sm:ml-[200px] 2xl:ml-[250px] bg-[#edeff2] py-10 sm:px-[30px] md:px-[50px] lg:pr-0 md:grid lg:grid-cols-[_1fr_400px] 2xl:grid-cols-[_1fr,_450px] relative z-0 ">
        {/* <div className="fixed top-20 left-40 w-40 h-40 rounded-full bg-orange-400 blur-3xl z-0"></div>
        <div className="fixed bottom-20 right-60 w-60 h-60 rounded-full bg-orange-400 blur-[100px] z-0"></div> */}
        {children}
        <div className="lg:flex flex-col hidden h-fit fixed top-[100px] right-[70px] z-10">
          <div className="bg-slate-950 mt-5 rounded-3xl w-[270px] 2xl:w-[300px] h-[551.25px] 2xl:h-[615px] flex mx-auto">
            <div className="w-[250px] 2xl:w-[280px] h-[531.25px] 2xl:h-[595px] rounded-2xl m-auto font-semibold  relative  overflow-x-hidden ">
              <FaqbocsPreview props={children.props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
