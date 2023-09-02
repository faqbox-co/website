import TypeFaq from "./faq";
import TypeLink from "./link";

type TypeUserData = {
  username: string;
  email: string;
  theme: string;
  title: string;
  imageHash?: string | null;
  data: TypeFaq[];
  faqs: TypeFaq[];
  links: TypeLink[];
};

export default TypeUserData;
