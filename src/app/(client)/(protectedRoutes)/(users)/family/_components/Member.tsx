"use client";

import { useAuth } from "@/app/(client)/hooks/useAuth";
import { Image, Skeleton, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWR, { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";
import DownloadAbleImage from "./DownloadAbleImage";
import { useFamily } from "@/app/(client)/hooks/useFamily";

type FamilyImages = {
  image_name: string;
  IMAGEID: string;
}[];

const fetcher: Fetcher<FamilyImages> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function Member({ id }: { id: string }) {
  const { isFamilyMember, isLoading } = useFamily();

  const getKey = () => {
    if (!id || !isFamilyMember(parseInt(id))) return null;
    return `/api/member/${id}`; // SWR key
  };
  const { data, isLoading: isFetching } = useSWR<FamilyImages>(getKey, fetcher);

  if (!isFamilyMember(parseInt(id)) && !isLoading)
    return <p>Not a family member</p>;

  return (
    <div className="flex flex-row space-x-1 space-y-2 flex-wrap justify-between">
      {isFetching && (
        <div className="w-full flex flex-row space-x-1 space-y-2 flex-wrap justify-between">
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
        </div>
      )}
      {data?.map((image) => (
        <div
          key={image.IMAGEID}
          className="flex flex-col items-center justify-center"
        >
          <DownloadAbleImage image_name={image.IMAGEID} />
        </div>
      ))}
    </div>
  );
}
