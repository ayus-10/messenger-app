import { getDurationString } from "@/utils/getDurationString";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { FaCheck, FaCircleUser, FaPlus } from "react-icons/fa6";
import { IoClose, IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";

const SENT = "sent";
const RECEIVED = "received";
const FIND = "find";

type ActiveTab = typeof SENT | typeof RECEIVED;

const FIND_USER_QUERY = gql`
  query FindUserQuery($email: String!) {
    findUser(email: $email) {
      id
      email
      fullName
    }
  }
`;

const GET_FRIEND_REQUESTS_QUERY = gql`
  query GetFriendRequestsQuery {
    getFriendRequests {
      sent {
        id
        senderId
        receiverId
        sentDate
        receiver {
          email
          fullName
        }
      }
      received {
        id
        senderId
        receiverId
        sentDate
        sender {
          email
          fullName
        }
      }
    }
  }
`;

const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SendFriendRequestMutation($receiverId: Int!) {
    sendFriendRequest(receiverId: $receiverId) {
      id
    }
  }
`;

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation AcceptFriendRequestMutation($acceptFriendRequestId: Int!) {
    acceptFriendRequest(id: $acceptFriendRequestId) {
      id
    }
  }
`;

const REJECT_FRIEND_REQUEST_MUTATION = gql`
  mutation RejectFriendRequestMutation($rejectFriendRequestId: Int!) {
    rejectFriendRequest(id: $rejectFriendRequestId) {
      id
    }
  }
`;

const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation CancelFriendRequestMutation($cancelFriendRequestId: Int!) {
    cancelFriendRequest(id: $cancelFriendRequestId) {
      id
    }
  }
`;

interface FindUserQueryResponse {
  findUser: {
    id: number;
    email: string;
    fullName: string;
  };
}

interface GetFriendRequestsResponse {
  getFriendRequests: {
    sent: {
      id: number;
      senderId: number;
      receiverId: number;
      sentDate: number;
      receiver: {
        email: string;
        fullName: string;
      };
    }[];
    received: {
      id: number;
      senderId: string;
      receiverId: string;
      sentDate: number;
      sender: {
        email: string;
        fullName: string;
      };
    }[];
  };
}

export default function FriendsTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(RECEIVED);
  const [search, setSearch] = useState("");

  const { data } = useQuery<GetFriendRequestsResponse>(
    GET_FRIEND_REQUESTS_QUERY,
  );

  const [find, result] = useLazyQuery<FindUserQueryResponse>(FIND_USER_QUERY);

  const [userFound, setUserFound] = useState<FindUserQueryResponse | undefined>(
    undefined,
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setUserFound(undefined);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setSearch("");
  }

  function findUser() {
    if (!search) return;
    find({ variables: { email: search } });
    if (result.data) setUserFound(result.data);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Find friends</h1>
        <div className="relative mb-2 w-full">
          <input
            ref={searchInputRef}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Email..."
            type="text"
            className="w-full rounded-full bg-white py-2 pl-4 pr-16 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <button
            className="absolute right-0 top-1/2 flex h-full w-14 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 px-2 text-xl text-white duration-200 ease-in-out hover:bg-purple-800"
            onClick={userFound ? clearSearch : findUser}
          >
            {userFound ? <IoClose /> : <IoSearch />}
          </button>
        </div>
        <FindUserResult
          data={userFound}
          error={result.error}
          loading={result.loading}
        />
      </div>
      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Friend requests</h1>
        <div className="relative flex justify-between gap-2 rounded-full bg-purple-200 p-2 dark:bg-gray-750">
          <button
            onClick={() => setActiveTab(RECEIVED)}
            className={`w-full rounded-full bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${activeTab === RECEIVED ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Received</span>
          </button>
          <button
            onClick={() => setActiveTab(SENT)}
            className={`w-full rounded-full bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${activeTab === SENT ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Sent</span>
          </button>
          <div
            className={`absolute top-1/2 z-20 h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-full bg-purple-700 duration-200 ease-in-out ${activeTab === SENT ? "left-[50%]" : "left-[0.5rem]"}`}
          />
        </div>
        <div className="my-2 mb-4 flex h-1 grow flex-col gap-4 overflow-y-auto">
          <FriendRequests friendRequestsData={data} tab={activeTab} />
        </div>
      </div>
    </div>
  );
}

interface FindUserResultProps {
  loading: boolean;
  data: FindUserQueryResponse | undefined;
  error: any;
}

function FindUserResult({ loading, data, error }: FindUserResultProps) {
  if (!loading) {
    if (data) {
      return (
        <FriendRequestCard
          email={data.findUser.email}
          name={data.findUser.fullName}
          id={data.findUser.id}
          tab={FIND}
        />
      );
    } else if (error) {
      return <ErrorMessage message={error.message} />;
    }
  } else {
    return <LoadingSpinner />;
  }
}

function LoadingSpinner() {
  return (
    <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 dark:bg-gray-750">
      <BeatLoader color="#7e22ce" />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 py-2 dark:bg-gray-750">
      <RiErrorWarningFill className="flex-shrink-0 text-4xl text-purple-700 dark:text-white" />
      <h2 className="leading-5 text-purple-700 dark:text-white md:text-lg md:leading-6">
        {message}
      </h2>
    </div>
  );
}

interface FriendRequestsProps {
  friendRequestsData: GetFriendRequestsResponse | undefined;
  tab: ActiveTab;
}

function FriendRequests(props: FriendRequestsProps) {
  const { tab, friendRequestsData } = props;

  if (!friendRequestsData)
    return <ErrorMessage message="No sent or received requests" />;

  switch (tab) {
    case SENT:
      if (friendRequestsData.getFriendRequests.sent.length === 0)
        return <ErrorMessage message="No sent requests" />;
      return (
        <div className="flex flex-col gap-2">
          {friendRequestsData.getFriendRequests.sent.map((s) => (
            <FriendRequestCard
              key={s.id}
              tab={SENT}
              id={s.id}
              name={s.receiver.fullName}
              email={s.receiver.email}
              date={s.sentDate}
            />
          ))}
        </div>
      );
    case RECEIVED:
      if (friendRequestsData.getFriendRequests.received.length === 0)
        return <ErrorMessage message="No received requests" />;
      return (
        <div className="flex flex-col gap-2">
          {friendRequestsData.getFriendRequests.received.map((r) => (
            <FriendRequestCard
              key={r.id}
              tab={RECEIVED}
              id={r.id}
              name={r.sender.fullName}
              email={r.sender.email}
              date={r.sentDate}
            />
          ))}
        </div>
      );
  }
}

interface FriendRequestCardProps {
  tab: typeof FIND | typeof RECEIVED | typeof SENT;
  id: number;
  name: string;
  email: string;
  date?: number;
}

function FriendRequestCard(props: FriendRequestCardProps) {
  const { tab, id, name, email, date } = props;

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-750">
      <div className="flex grow flex-col gap-2">
        <div className="flex gap-2">
          <FaCircleUser className="flex-shrink-0 text-[50px]" />
          <div>
            <h2 className="line-clamp-1 md:text-lg md:font-semibold">{name}</h2>
            <h3 className="line-clamp-1 text-sm md:text-base">{email}</h3>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <RequestAction tab={tab} id={id} />
          {date && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getDurationString(date)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface RequestActionProps {
  tab: typeof FIND | typeof RECEIVED | typeof SENT;
  id: number;
}

function RequestAction({ tab, id }: RequestActionProps) {
  const [send] = useMutation(SEND_FRIEND_REQUEST_MUTATION);
  const [accept] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);
  const [reject] = useMutation(REJECT_FRIEND_REQUEST_MUTATION);
  const [cancel] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION);

  function sendRequest() {
    send({ variables: { receiverId: Number(id) } });
  }

  function acceptRequest() {
    accept({ variables: { acceptFriendRequestId: Number(id) } });
  }

  function rejectRequest() {
    reject({ variables: { rejectFriendRequestId: Number(id) } });
  }

  function cancelRequest() {
    cancel({ variables: { cancelFriendRequestId: Number(id) } });
  }

  switch (tab) {
    case RECEIVED:
      return (
        <div className="flex gap-2">
          <button
            onClick={acceptRequest}
            className="rounded-full border-2 border-green-200 bg-green-200 px-3 text-green-500 duration-200 ease-in-out hover:border-green-500 hover:bg-transparent"
          >
            <span className="hidden text-sm font-semibold md:inline">
              Accept
            </span>
            <FaCheck className="md:hidden" />
          </button>
          <button
            onClick={rejectRequest}
            className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent"
          >
            <span className="hidden text-sm font-semibold md:inline">
              Reject
            </span>
            <MdClose className="md:hidden" />
          </button>
        </div>
      );
    case SENT:
      return (
        <button
          onClick={cancelRequest}
          className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent"
        >
          <span className="hidden text-sm font-semibold md:inline">Cancel</span>
          <MdClose className="md:hidden" />
        </button>
      );
    case FIND:
      return (
        <button
          onClick={sendRequest}
          className="rounded-full border-2 border-purple-200 bg-purple-200 px-3 text-purple-500 duration-200 ease-in-out hover:border-purple-500 hover:bg-transparent"
        >
          <span className="hidden text-sm font-semibold md:inline">
            Add friend
          </span>
          <FaPlus className="md:hidden" />
        </button>
      );
  }
}
