type Props = {
  setPop: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PopupQuestion({ setPop }: Props) {
  window.onclick = (e) => {
    if (e.target == document.getElementById("questionBox")) setPop(false);
  };
  return (
    <div
      id="questionBox"
      className="w-[100vw] h-[100vh] bg-gray-600/70 fixed top-0 flex z-10"
    >
      <form className="max-w-md w-[90vw] m-auto bg-white rounded-lg p-10 z-10">
        <h1 className="font-poppins text-2xl font-bold text-center mb-3">
          Question
        </h1>
        <textarea
          name="question"
          id="question"
          className="w-full rounded-lg p-3 text-lg h-44 outline-none border-[2px] border-transparent focus:border-slate-900 bg-gray-100 resize-none"
          placeholder="What's your question?"
          autoFocus
        ></textarea>
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 text-slate-50 py-2 px-3 font-poppins font-semibold text-lg mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
