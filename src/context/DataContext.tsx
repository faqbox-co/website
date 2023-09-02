import CustomSession from "@/types/custom-session";
import TypeFaq from "@/types/faq";
import TypeUserData from "@/types/user-data";
import TypeLink from "@/types/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type UpdateSession = (data?: any) => Promise<CustomSession | null>;

export type DataContextProps = {
  serverData: TypeUserData;
  setServerData: React.Dispatch<React.SetStateAction<TypeUserData>>;
  clientData: TypeUserData;
  setClientData: React.Dispatch<React.SetStateAction<TypeUserData>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveChange: () => void;
  session:
    | { update: UpdateSession; data: CustomSession; status: "authenticated" }
    | {
        update: UpdateSession;
        data: null;
        status: "unauthenticated" | "loading";
      };
};

const DataContext = createContext<DataContextProps | null>(null);
const defaultState = {
  username: "",
  theme: "faqbocs-monochrome",
  title: "My FAQ",
  imageHash: null,
  email: "",
  data: [],
  faqs: [],
  links: [],
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [serverData, setServerData] = useState<TypeUserData>(defaultState);
  const [clientData, setClientData] = useState<TypeUserData>(defaultState);
  const [image, setImage] = useState<string>("");
  const [upImg, setUpImg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const session = useSession();

  /**
   * Initialize user data
   */

  useEffect(() => {
    if (session.status === "loading") {
      return;
    } else if (session.status === "unauthenticated") {
      if (!router.asPath.startsWith("/admin")) {
        setLoading(false);
        return;
      } else {
        router.push("/auth/login");
      }
    } else if (session.status === "authenticated") {
      if (!router.asPath.startsWith("/admin")) return;
      const sessionData = session.data as CustomSession;

      fetch("/api/faq/" + sessionData.username)
        .then((resp) => {
          return resp.text();
        })
        .then((text) => {
          const parsed = JSON.parse(text);
          if (!parsed.ok) return;
          setImage((image) => {
            return parsed.message.imageHash
              ? `/api/images/${parsed.message.imageHash}`
              : image;
          });
          setServerData(parsed.message);
          setClientData(parsed.message);
          setLoading(false);
        });
    }
  }, [session, router]);

  /**
   * Save change related functions
   */

  const checkFaqs = useCallback(() => {
    const lenClient = clientData.faqs.length;
    const lenServer = serverData.faqs.length;

    if (lenClient !== lenServer) return false;

    return clientData.faqs.every((v, i) => {
      const curr = serverData.faqs[i];
      return curr?.a === v.a && curr?.q === v.q && curr?.id === v.id;
    });
  }, [serverData.faqs, clientData.faqs]);

  const checkLinks = useCallback(() => {
    const lenClient = clientData.links.length;
    const lenServer = serverData.links.length;

    if (lenClient !== lenServer) return false;

    return clientData.links.every((v, i) => {
      const curr = serverData.links[i];
      return (
        curr.id === v.id &&
        curr.title === v.title &&
        curr.url === v.url &&
        curr.urlType === v.urlType
      );
    });
  }, [serverData.links, clientData.links]);

  const checkImage = useCallback(() => {
    if (loading) return;
    if (!image) {
      if (clientData.imageHash) {
        return true;
      } else {
        return;
      }
    }
    if (image.startsWith("blob:")) {
      return true;
    } else {
      return false;
    }
  }, [image, clientData.imageHash, loading]);

  const checkSame = useCallback(async () => {
    if (loading) return {};
    let dataToUpload: { [key: string]: any } = {};

    if (!checkFaqs()) dataToUpload.faqs = clientData.faqs;
    if (!checkLinks()) dataToUpload.links = clientData.links;

    if (checkImage()) {
      if (!image) {
        dataToUpload.image = "";
      } else {
        const resp = await fetch(image);
        const blob = await resp.blob();
        const arrBuff = await blob.arrayBuffer();
        dataToUpload.image = Buffer.from(arrBuff).toString("base64");
      }
    }

    if (clientData.title !== serverData.title) {
      dataToUpload.title = clientData.title;
    }

    if (clientData.theme !== serverData.theme) {
      dataToUpload.theme = clientData.theme;
    }

    return dataToUpload;
  }, [
    checkFaqs,
    checkLinks,
    checkImage,
    clientData,
    serverData,
    image,
    loading,
  ]);

  /**
   * Add onbeforeunload event
   */

  useEffect(() => {
    async function run() {
      if (!router.asPath.startsWith("/admin")) return;
      if (Object.keys(await checkSame()).length === 0) {
        window.onbeforeunload = null;
      } else {
        window.onbeforeunload = (e) => {
          return (e.returnValue = "");
        };
      }
    }
    run();
    return;
  }, [checkSame, router.asPath]);

  const saveChange = useCallback(async () => {
    if (loading) return;

    if (!router.asPath.startsWith("/admin")) return;

    const toUpload = await checkSame();

    if (Object.keys(toUpload).length === 0) {
      return;
    }

    setLoading(true);

    const resp = await fetch("/api/faq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpload),
    });
    const text = await resp.text();
    const message = JSON.parse(text).message;
    if (message.imageHash) URL.revokeObjectURL(image);
    setImage((image) => {
      return message.imageHash ? `/api/images/${message.imageHash}` : image;
    });
    setClientData((clientData) => {
      return { ...clientData, ...message };
    });
    setServerData((serverData) => {
      return { ...serverData, ...message };
    });
    setLoading(false);

    if (message.messages) console.warn(message.messages.join("\n"));
  }, [checkSame, router.asPath, image, loading]);

  useEffect(() => {
    const interval = setInterval(saveChange, 3000);
    return () => clearInterval(interval);
  });

  return (
    <DataContext.Provider
      value={{
        serverData,
        setServerData,
        clientData,
        setClientData,
        image,
        setImage,
        loading,
        setLoading,
        saveChange,
        session,
      }}
    >
      {/* {session.status === "loading" ? children : <div>Loading session...</div>} */}
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
