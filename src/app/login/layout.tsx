import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Log in - MysterioMessagez",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
