import CustomSession from "@/@types/custom_session";
import IData from "@/interfaces/data";
import IFaq from "@/interfaces/faq";
import ILink from "@/interfaces/links";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type DataContextProps = {
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
  currentData: IFaq;
  setCurrentData: React.Dispatch<React.SetStateAction<IFaq>>;
  link: ILink[];
  setLink: React.Dispatch<React.SetStateAction<ILink[]>>;
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
  const [link, setLink] = useState<ILink[]>([]);
  const [currentData, setCurrentData] = useState<IFaq>({
    username: "",
    theme: "",
    title: "",
    image: "",
    email: "",
    data: [],
    link: [],
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

  const checkData = useCallback(() => {
    const lenData = data.length;
    const lenCurr = currentData.data?.length;

    if (lenData !== lenCurr) return false;

    return data.every((v, i) => {
      const currData = currentData.data[i];
      return (
        currData?.a === v.a && currData?.q === v.q && currData?.id === v.id
      );
    });
  }, [data]);

  const checkSame = useCallback(() => {
    if (loading) return {};
    let localData: { [key: string]: any } = {};

    if (!checkData()) localData.data = data;
    console.log(localData)
    
    if (image != currentData.image) localData.image = image;
    if (title != currentData.title) localData.title = title;
    if (theme != currentData.theme)  localData.theme = theme;
    // console.log("localData nya cuyyyyy", localData);
    return localData;
  }, [checkData, data, image, title, theme]);

  // useEffect(() => {
  //   if (!router.asPath.startsWith("/admin")) return;
  //   if (Object.keys(checkSame()).length === 0) {
  //     window.onbeforeunload = null;
  //     return;
  //   } else {
  //     window.onbeforeunload = (e) => {
  //       return (e.returnValue = "");
  //     };
  //   }
  // }, [checkSame]);

  async function saveChange() {
    if (loading) return;

    console.log("saveChange called")
    const toPost = checkSame();

    if (Object.keys(toPost).length === 0) {
      console.log("toPost has 0 length")
      return;
    }

    setLoading(true);
    console.log("loading state is true. Fetching...")

    fetch("/api/faq", {
      method: "POST",
      body: JSON.stringify(toPost),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("Returning response text...")
        return resp.text();
      })
      .then((text) => {
        console.log("Parsing text")
        const parsed = JSON.parse(text);
        setCurrentData({ ...currentData, ...parsed.message });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (router.asPath.startsWith("/admin")) {
      saveChange().then().catch()
    }
  }, [data, image, theme, title])
  // console.log(checkSame(), theme, currentData)

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        link,
        setLink,
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
