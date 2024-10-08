import Image from "next/image";
import { Message } from "./MessagesContainer";

const LEFT = "left";
const RIGHT = "right";

interface MessageBoxProps extends Message {
  align: typeof LEFT | typeof RIGHT;
}

export default function MessageBox(props: MessageBoxProps) {
  const {
    align,
    username,
    profilePictureUrl,
    sentTime,
    receivedTime,
    messageText,
  } = props;

  return (
    <div
      className={`flex w-full ${align === RIGHT ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex w-1/2 items-start gap-2 md:gap-3 lg:items-center ${align === LEFT ? "flex-row" : "flex-row-reverse"}`}
      >
        <Image
          priority
          alt={`Profile picture of ${username}`}
          src={profilePictureUrl}
          height={50}
          width={50}
          className="hidden rounded-full lg:block"
        />
        <div className="flex flex-col">
          <span className="p-1 text-xs text-gray-500 dark:text-gray-400 md:text-sm lg:p-0">
            {sentTime}
          </span>
          <div className="flex flex-col items-start gap-4 rounded-lg bg-gray-200 p-2 dark:bg-gray-850 lg:flex-row lg:items-end lg:px-4 lg:py-3">
            <p className="select-all text-sm md:text-base">{messageText}</p>
            <span className="text-right text-xs">{receivedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
