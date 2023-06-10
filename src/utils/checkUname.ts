import { GetServerSideProps } from "next";
import CustomSession from "@/@types/custom_session";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const PAGE = {
  LOGIN: "/auth/login",
  NEW: "/auth/new",
  HOME: "/",
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = <CustomSession | null>(
    await getServerSession(context.req, context.res, authOptions)
  );
  const resolvedUrl = context.resolvedUrl;

  if (!session) {
    if ([PAGE.LOGIN, PAGE.HOME].includes(resolvedUrl))
      return { props: { data: session } };
    return {
      redirect: {
        destination: PAGE.LOGIN,
        permanent: false,
      },
    };
  }

  if (!session.username) {
    if ([PAGE.NEW, PAGE.HOME].includes(resolvedUrl))
      return { props: { data: session } };
    return {
      redirect: {
        destination: PAGE.NEW,
        permanent: false,
      },
    };
  }

  if ([PAGE.NEW, PAGE.LOGIN].includes(resolvedUrl)) {
    return { redirect: { destination: PAGE.HOME, permanent: false } };
  }

  return {
    props: { data: session },
  };
};

export { getServerSideProps as default };
