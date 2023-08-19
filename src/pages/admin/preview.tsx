import AdminLayout from "@/components/AdminLayout";
import FaqbocsPreview from "@/components/FaqbocsPreview";

export default function Preview({ data }: { data: React.ReactElement["props"] }) {
  return (
    <div className=" sm:w-full max-w-3xl w-[95%] sm:m-0 mx-auto relative z-10">
      <h1 className="font-ssp text-4xl font-black text-center ">
        Preview
      </h1>
      <div className="sm:flex hidden lg:hidden h-fit relative z-10 mt-5">
        <div className="bg-slate-950 rounded-3xl w-[270px] 2xl:w-[380px] h-[551.25px] 2xl:h-[773.75px] flex mx-auto">
          <div className="w-[250px] 2xl:w-[350px] h-[531.25px] 2xl:h-[743.75px] rounded-2xl m-auto font-semibold  relative  overflow-x-hidden hidden-scrollbar">
            <FaqbocsPreview props={{ data }} />
          </div>
        </div>
      </div>
    </div>
  );
}

Preview.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export { default as getServerSideProps } from "@/utils/checkUname";
