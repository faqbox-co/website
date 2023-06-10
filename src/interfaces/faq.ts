import IData from "./data";

export default interface IFaq {
  username: string;
  email: string;
  theme: string;
  title: string;
  image?: string;
  data: IData[];
}
