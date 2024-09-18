"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setAuthenticatedUser } from "@/redux/slices/authenticatedUserSlice";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AUTH_QUERY = gql`
  query AuthQuery {
    auth {
      __typename
      email
      fullName
    }
  }
`;

interface AuthQueryResponse {
  auth: {
    email: string;
    fullName: string;
  } | null;
}

export const useAuthentication = () => {
  const { loading, data, error } = useQuery<AuthQueryResponse>(AUTH_QUERY);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (data?.auth) {
        dispatch(setAuthenticatedUser(data.auth));
        if (location.pathname !== "/chat") {
          router.push("/chat");
        }
      } else {
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          router.push("/login");
        }
      }
    }
  }, [loading, data, error, dispatch, router]);
};
