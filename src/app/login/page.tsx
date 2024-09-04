"use client";

import UserForm from "@/components/UserForm";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginQueryResponse {
  loginUser: {
    __typename: string;
    token: string;
  };
}

const LOGIN_QUERY = gql`
  query LoginQuery($user: UserCredentialsInput!) {
    loginUser(user: $user) {
      __typename
      token
    }
  }
`;

export default function Login() {
  // TODO: redirect if logged in

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [login, { loading, data, error }] =
    useLazyQuery<LoginQueryResponse>(LOGIN_QUERY);

  useEffect(() => {
    if (email && password) login({ variables: { user: { email, password } } });
  }, [email, password, login]);

  useEffect(() => {
    if (!loading) {
      if (data && data.loginUser.__typename === "LoginToken") {
        localStorage.setItem("AUTH_TOKEN", data.loginUser.token);
        alert(`Logged in as ${email}`);
        router.push("/chat");
      }
      if (error) {
        alert(error.message);
      }
    }
  }, [loading, data, error, email, router]);

  return (
    <UserForm
      formType="login"
      setUserEmail={setEmail}
      setUserPassword={setPassword}
    />
  );
}
