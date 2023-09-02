import { Session } from "next-auth";

type CustomSession = Session & {
  username?: string;
};

export default CustomSession;
