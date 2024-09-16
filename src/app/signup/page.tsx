"use client";

import UserForm from "@/components/UserForm";
import { useAuthentication } from "@/hooks/useAuthentication";
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
  mutation SignupMutation($user: SignupInput!) {
    createUser(user: $user) {
      __typename
      token
    }
  }
`;

export default function Signup() {
  useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  const [signup, { loading, data, error }] =
    useMutation<SignupMutationResponse>(SIGNUP_MUTATION);

  useEffect(() => {
    // 'email', 'password' and 'fullName' will be set by the 'UserForm' component after user submission
    if (email && password && fullName)
      signup({ variables: { user: { email, password, fullName } } });
  }, [email, password, signup, fullName]);

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
      setUserFullName={setFullName}
    />
  );
}
