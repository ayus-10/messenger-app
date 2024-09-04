import { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import ApolloClientProvider from "@/providers/ApolloClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MysterioMessagez",
  description: "Messaging with a twist of mystery",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientProvider>
          <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
