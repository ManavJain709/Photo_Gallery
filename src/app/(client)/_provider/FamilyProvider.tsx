"use client";
import { auth } from "@/lib";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../_context";
import { FirebaseError } from "firebase/app";
import FamilyContext, { FamilyDetails } from "../_context/FamilyContext";
import useSWR, { Fetcher } from "swr";
import { useAuth } from "../hooks/useAuth";

const fetcher: Fetcher<FamilyDetails> = (url: string) =>
  fetch(url).then((res) => res.json());

const FamilyProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const [familyId, setFamilyId] = useState<string | null>();
  const getUrl = () => {
    if (!familyId) return null;
    return `/api/family/${familyId}`;
  };
  const { data, error, mutate, isLoading } = useSWR(() => getUrl(), fetcher);

  useEffect(() => {
    const getFamilyId = async () => {
      const claims = await user?.getIdTokenResult();

      if (!claims) return;
      setFamilyId(claims.claims.familyId as string);
    };

    getFamilyId();
  }, []);

  useEffect(() => {
    if (!familyId) return;
    mutate();
  }, [familyId]);

  const fetchMember = async (id: number) => {
    const isMemberPartOfFamily = data?.members.find(
      (member) => member.id === id
    );
    if (!isMemberPartOfFamily) throw new Error("Member not part of family");
    try {
      const response = await fetch(`/api/member/${id}`);
      if (!response.ok) throw new Error("Failed to fetch member");
      const member = await response.json();
      return member;
    } catch (error) {
      throw new Error("Failed to fetch member");
    }
  };

  return (
    <FamilyContext.Provider
      value={{
        isLoading,
        error,
        data: data ?? null,
        fetchMember,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export default FamilyProvider;
