import { useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import MessagesContainer from "./MessagesContainer";

export default function ChatBody() {
  const currentChat = {
    username: "John Doe",
    status: "Active",
  };

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex grow flex-col">
      <div className="relative flex h-[5.5rem] w-full items-center justify-between bg-gray-100 px-2 py-4 dark:bg-gray-750 md:px-6">
        <div>
          <h1 className="text-xl md:text-2xl md:font-semibold">
            {currentChat.username}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
            {currentChat.status}
          </p>
        </div>
        <div className="flex text-4xl text-purple-700 dark:text-purple-500 md:gap-2">
          <IoIosVideocam className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800" />
          <MdLocalPhone className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800" />
          <IoSearch
            onClick={() => setShowSearch(!showSearch)}
            className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800"
          />
        </div>
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search for message..."
          className={`absolute left-0 top-[100%] w-full border-b-[3px] border-gray-500 bg-purple-100 p-2 outline-none duration-200 ease-in-out hover:border-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:hover:border-purple-500 dark:focus:border-purple-500 md:px-3 md:py-2 md:text-lg ${showSearch ? "block" : "hidden"}`}
        />
      </div>
      <MessagesContainer search={search} />
    </div>
  );
}
