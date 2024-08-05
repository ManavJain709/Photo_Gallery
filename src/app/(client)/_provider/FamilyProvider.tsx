"use client";
import { PropsWithChildren, useEffect, useState } from "react";
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

  const isFamilyMember = (id: number) => {
    return data?.members.some((member) => member.id === id) ?? false;
  };

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
        isFamilyMember,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export default FamilyProvider;
