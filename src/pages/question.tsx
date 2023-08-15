import FAQhome from "@/components/FAQhome";
import Layout from "@/components/Layout";

export default function Question(){
    const datafaq = [
        {
          id: "0",
          q: "What is FAQ Page?",
          a: "In simple terms, an FAQ is a list of questions frequently asked by stakeholders such as prospects and customers, along with answers to those questions. Just like what you are seeing right now.",
        },
        {
          id: "1",
          q: "Why should we use Faqbocs?",
          a: "Faqbocs helps you create, customize, and share your own FAQ page with incredible ease",
        },
        {
          id: "2",
          q: "Is it free to use?",
          a: "Yes, it is completely free to use!",
        },
        {
          id: "3",
          q: "Do I need a website?",
          a: "No, you don't! Faqbocs was created to help you make your own FAQ page without having to build a website.",
        },
        {
          id: "4",
          q: "Is it similar to Linktree?",
          a: "Faqbocs is more focus on providing important informations related to your businesses, organizations, events, or anything to your stakeholders or audience, while Linktree is a tool that allows you to share multiple links on social media. However, you can use both of them at the same time. Just put your Faqbocs link inside of your Linktree!",
        },
    
      ];
    return (
        <>
        <div
        id="questions"
        className="min-h-[100vh] flex 2xl:min-h-[800px] bg-slate-200 "
        >
            <div className="m-auto max-w-7xl px-5 sm:px-28 2xl:px-0 mx-auto flex flex-col text-center sm:py-28 py-24">
            <h1 className="font-ssp sm:text-6xl text-5xl mb-8 font-black">
                Got Questions?
            </h1>
            <div className="max-w-5xl flex flex-col gap-1 mx-auto">
                {datafaq.map((item) => (
                <FAQhome key={item.id} question={item.q} answer={item.a} />
                ))}
            </div>
            </div>
        </div>
        </>
    )
}

Question.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
  };