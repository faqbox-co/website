import CustomSession from "@/@types/custom_session";
import IData from "@/interfaces/data";
import IFaq from "@/interfaces/faq";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useState } from "react";

export type DataContextProps = {
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
  currentData: IFaq;
  setCurrentData: React.Dispatch<React.SetStateAction<IFaq>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IData[]>([]);
  const [currentData, setCurrentData] = useState<IFaq>({
    username: "",
    theme: "",
    title: "",
    image: "",
    email: "",
    data: [],
  });
  const [theme, setTheme] = useState("faqbocs-monochrome");
  const [title, setTitle] = useState("My FAQ");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let sessionData = useMemo(() => {
    return {};
  }, []);

  if (children) {
    const cucu = (children as React.ReactElement).props.children;
    if (cucu) {
      const cicit = (cucu as React.ReactElement).props;
      sessionData = cicit.data;
    }
  }

  useEffect(() => {
    const session = sessionData as CustomSession;
    if (currentData.username) {
      setLoading(false);
      return;
    }
    if (!router.asPath.startsWith("/admin")) {
      setLoading(false);
      return;
    }
    if (sessionData) {
      fetch("/api/faq/" + session.username)
        .then((resp) => {
          return resp.text();
        })
        .then((text) => {
          const parsed = JSON.parse(text);
          if (!parsed.ok) return;
          setCurrentData(parsed.message);
          setData(parsed.message.data);
          setTheme(parsed.message.theme);
          setTitle(parsed.message.title);
          if (!parsed.message.image) setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [sessionData, router.asPath, currentData.username]);

  useEffect(() => {
    if (!currentData.image) return;
    const session = sessionData as CustomSession;
    if (!session) return;
    if (!session.username) return;
    fetch(`/api/images/${session.username}`).then((res) => {
      if (!res.ok) {
        return;
      }
      const content_type = res.headers.get("Content-Type");
      res
        .blob()
        .then((blob) => blob.arrayBuffer())
        .then((arrBuff) => {
          const buff = Buffer.from(arrBuff).toString("base64");
          const img = `data:${content_type};base64,${buff}`;
          setImage(img);
          setCurrentData((c) => {
            return { ...c, image: img };
          });
          setLoading(false);
        });
    });
  }, [sessionData, currentData.image]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        theme,
        setTheme,
        title,
        setTitle,
        currentData,
        setCurrentData,
        image,
        setImage,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
