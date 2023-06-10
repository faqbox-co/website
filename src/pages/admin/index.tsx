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
import IData from "@/interfaces/data";
import randomID from "@/utils/randomid";

type DataType = {
  data: IData[];
  setData: React.Dispatch<
    React.SetStateAction<{ id: string; q: string; a: string }[]>
  >;
};

const Dashboard: NextPageWithLayout = () => {
  const { data, setData } = useContext(DataContext) as DataType;
  const [addQuestion, setAddQuestion] = useState(false);
  const sensors = [useSensor(SmartPointerSensor)];
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [empty, setEmpty] = useState(false);

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((items) => {
        const activeIndex = items.map((item) => item.id).indexOf(active.id);
        const overIndex = items.map((item) => item.id).indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleSumbit = (e: any) => {
    e.preventDefault();
    if (newQuestion.trim() && newAnswer.trim()) {
      setAddQuestion(!addQuestion);
      setData([{ id: randomID(), q: newQuestion, a: newAnswer }, ...data]);
      setNewQuestion("");
      setNewAnswer("");
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  };

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <>
      <Head>
        <title>Faqbocs Admin</title>
      </Head>
      <div className=" sm:w-full max-w-3xl w-[95%] sm:m-0 pb-8 sm:pb-0 mx-auto relative z-10">
        <h1 className="hidden sm:block font-poppins text-3xl font-semibold text-center ">
          Dashboard
        </h1>

        {!addQuestion && (
          <button
            className="bg-blue-600 sm:mt-5 mt-20 mb-3 sm:mb-5 hover:bg-blue-800 flex justify-center items-center py-3 px-3 w-full transition font-poppins font-semibold gap-1 rounded-2xl text-slate-50 relative z-0"
            onClick={() => setAddQuestion(!addQuestion)}
          >
            <HiPlus className="text-xl" />
            Add Question
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
                setNewQuestion("");
              }}
            >
              <RxCross1 className="text-xl" />
            </button>

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
              placeholder="Question..."
              value={newQuestion}
              onChange={(e) => {
                setNewQuestion(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <label htmlFor="question" className="mt-2 sm:text-lg font-semibold">
              Answer
            </label>
            <Tiptap newAnswer={newAnswer} setNewAnswer={setNewAnswer} />
            {empty && (
              <p className="text-red-500 text-sm">
                *Please fill the question and answer
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
          <SortableContext items={data} strategy={verticalListSortingStrategy}>
            {data.map((item) => (
              <SortableItem
                data={data}
                setData={setData}
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

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export { default as getServerSideProps } from "@/utils/checkUname";

export default Dashboard;
