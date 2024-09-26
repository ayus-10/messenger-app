import { useEffect, useState } from "react";
import UserProfiles from "./UserProfiles";
import { FaCircleUser } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hooks";

export default function MessagesTab() {
  const [isActive, setIsActive] = useState(true);

  const userData = useAppSelector((state) => state.authenticatedUser);

  useEffect(() => {
    const updateIsActive = () => setIsActive(navigator.onLine);

    window.addEventListener("online", updateIsActive);
    window.addEventListener("offline", updateIsActive);

    return () => {
      window.removeEventListener("offline", updateIsActive);
      window.removeEventListener("online", updateIsActive);
    };
  }, []);

  return (
    <>
      <div className="grid h-48 place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          <FaCircleUser className="text-[100px]" />
          <div
            className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${isActive ? "bg-green-500" : "bg-yellow-500"}`}
          />
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl md:font-semibold">
            {userData.fullName}
          </h1>
          <h2 className="text-sm md:text-base">{userData.email}</h2>
        </div>
        <span
          className={`rounded-lg px-5 py-1 font-bold ${isActive ? "bg-green-300 text-green-700" : "bg-yellow-300 text-yellow-700"}`}
        >
          {isActive ? "Active" : "Offline"}
        </span>
      </div>
      <UserProfiles />
    </>
  );
}
