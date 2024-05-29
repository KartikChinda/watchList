import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NextAuthProvider } from "~/providers/nextAuth";
import { Header } from "./_components/header";


export const metadata = {
  title: "My Movies",
  description: "A watchlist app to keep track of the movies and TV shows you're yet to binge on.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className=" bg-palette-4">
        <TRPCReactProvider>
          <NextAuthProvider>
            <Header />
            {children}
          </NextAuthProvider>

        </TRPCReactProvider>
      </body>
    </html>
  );
}
