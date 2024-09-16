import Image from "next/image";
import Link from "next/link";
import BannerImage from "../assets/account-banner.png";
import GoogleIcon from "../assets/google.ico";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LOGIN = "login";
const SIGNUP = "signup";

interface UserFormProps {
  formType: typeof LOGIN | typeof SIGNUP;
  setUserEmail: Dispatch<SetStateAction<string>>;
  setUserPassword: Dispatch<SetStateAction<string>>;
  setUserFullName?: Dispatch<SetStateAction<string>>;
}

export default function UserForm(props: UserFormProps) {
  const { formType, setUserEmail, setUserPassword, setUserFullName } = props;

  const [showPassword, setShowPassword] = useState(false);

  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fullName = fullNameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (formType === LOGIN) {
      if (email && password) {
        setUserEmail(email);
        setUserPassword(password);
      } else alert("Please fill up all the data");
    } else {
      if (email && password && fullName && setUserFullName) {
        setUserEmail(email);
        setUserPassword(password);
        setUserFullName(fullName);
      } else alert("Please fill up all the data");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-screen max-w-[1000px] items-center px-5 py-4">
      <div className="flex w-full flex-col md:flex-row md:justify-evenly lg:justify-between">
        <div className="md:w-[300px] lg:w-[450px]">
          <div className="my-6 flex flex-col gap-2 text-center md:text-start">
            <h1 className="text-3xl font-semibold text-gray-800">
              {formType === SIGNUP
                ? "Enjoy with MysterioMessagez"
                : "Continue to your Account"}
            </h1>
            <h2 className="text-gray-500">
              {formType === SIGNUP
                ? "Real-time communication 🚀"
                : "Welcome back 👋🏻"}
            </h2>
          </div>
          <button className="mx-auto my-6 flex w-full items-center justify-center gap-1 rounded-full border-2 border-purple-200 bg-purple-200 px-5 py-3 text-purple-700 duration-300 ease-in-out hover:bg-transparent md:mx-0">
            <Image src={GoogleIcon} alt="Google Icon" />
            <span>
              {formType === SIGNUP ? "Sign up" : "Log in"} with Google
            </span>
          </button>
          <div className="flex items-center gap-2 ">
            <div className="h-[1px] grow bg-gray-300"></div>
            <p className="text-gray-500">Or use Email</p>
            <div className="h-[1px] grow bg-gray-300"></div>
          </div>
          <form className="my-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div
              className={`relative flex-col-reverse ${formType === LOGIN ? "hidden" : "flex"}`}
            >
              <input
                ref={fullNameInputRef}
                id="fullName"
                className="peer rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type="text"
              />
              <label
                className="absolute left-2 top-0.5 z-10 translate-y-0 text-sm text-purple-700 duration-300 ease-in-out"
                htmlFor="fullName"
              >
                Full name
              </label>
            </div>
            <div className="relative flex flex-col-reverse">
              <input
                ref={emailInputRef}
                id="email"
                className="peer rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type="email"
              />
              <label
                className="absolute left-2 top-0.5 z-10 translate-y-0 text-sm text-purple-700 duration-300 ease-in-out"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="relative flex flex-col-reverse">
              <input
                ref={passwordInputRef}
                id="password"
                className="peer z-0 rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type={showPassword ? "text" : "password"}
              />
              <label
                className="absolute left-2 top-0.5 z-10 translate-y-0 text-sm text-purple-700 duration-300 ease-in-out"
                htmlFor="password"
              >
                Password
              </label>
              <TogglePassword show={showPassword} setShow={setShowPassword} />
            </div>
            <button className="group flex items-center justify-center rounded-md bg-purple-700 px-3 py-4 text-white">
              <span className="text-lg">
                {formType === SIGNUP ? "Sign up" : "Log in"}
              </span>
              <LuChevronRight className="relative text-2xl duration-300 ease-in-out group-hover:translate-x-2" />
            </button>
          </form>
          <p className="my-2 text-center text-sm text-gray-500">
            <span>
              {formType === LOGIN
                ? "Dont have an account? "
                : "Already have an account? "}
            </span>
            <Link
              href={formType === LOGIN ? "/signup" : "/login"}
              className="font-semibold underline"
            >
              {formType === LOGIN ? "Get Started" : "Log in"}
            </Link>
          </p>
        </div>
        <div className="hidden md:block">
          <Image
            height={525}
            width={350}
            priority
            src={BannerImage}
            className="h-[525px] w-[350px] rounded-lg"
            alt="Banner Image"
          />
        </div>
      </div>
    </main>
  );
}

interface TogglePasswordProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function TogglePassword({ show, setShow }: TogglePasswordProps) {
  switch (show) {
    case true:
      return (
        <FaEyeSlash
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-gray-700"
        />
      );
    case false:
      return (
        <FaEye
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-gray-700"
        />
      );
  }
}
