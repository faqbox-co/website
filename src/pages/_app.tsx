import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "@/styles/global.css";
import { DataProvider } from "@/context/DataContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <DataProvider>{getLayout(<Component {...pageProps} />)}</DataProvider>
    </SessionProvider>
  );
}
