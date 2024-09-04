"use client";

import UserForm from "@/components/UserForm";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SignupMutationResponse {
  createUser: {
    __typename: string;
    token: string;
  };
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($user: UserCredentialsInput!) {
    createUser(user: $user) {
      __typename
      token
    }
  }
`;

export default function Signup() {
  // TODO: redirect if logged in

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [signup, { loading, data, error }] =
    useMutation<SignupMutationResponse>(SIGNUP_MUTATION);

  useEffect(() => {
    if (email && password) signup({ variables: { user: { email, password } } });
  }, [email, password, signup]);

  useEffect(() => {
    if (!loading) {
      if (data && data.createUser.__typename === "LoginToken") {
        localStorage.setItem("AUTH_TOKEN", data.createUser.token);
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
      formType="signup"
      setUserEmail={setEmail}
      setUserPassword={setPassword}
    />
  );
}
