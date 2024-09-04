"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import { HashLoader } from "react-spinners";

export default function Home() {
  useAuthentication();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <HashLoader color="#a855f7" />
      <h1 className="text-2xl font-bold text-purple-500">
        Loading, please wait
      </h1>
    </div>
  );
}
