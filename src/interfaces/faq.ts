import IData from "./data";
import ILink from "./links";

export default interface IFaq {
  username: string;
  email: string;
  theme: string;
  title: string;
  image?: string;
  data: IData[];
  links: ILink[];
}
