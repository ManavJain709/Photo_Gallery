"use client";

import { useAuth } from "@/app/(client)/hooks/useAuth";
import { Image, Skeleton, Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWR, { Fetcher } from "swr";
import DownloadAbleImage from "./DownloadAbleImage";
import ImageModal from "./ImageModal";
import Link from "next/link";

type FamilyImages = {
  image_name: string;
  IMAGEID: string;
}[];

const fetcher: Fetcher<FamilyImages> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function FamilyImages() {
  const [lastViewedPhoto, setLastViewedPhoto] = useState<string | null>();

  const [photoId, setPhotoId] = useState<number | null>();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, setLastViewedPhoto]);

  const { user } = useAuth();
  const [familyId, setFamilyId] = useState<string | null>();

  const getKey = () => {
    if (!familyId) return null;
    return `/api/family/images/${familyId}`; // SWR key
  };
  const { data, isLoading } = useSWR<FamilyImages>(getKey, fetcher);

  useEffect(() => {
    const getFamilyId = async () => {
      const claims = await user?.getIdTokenResult();

      if (!claims) return;
      setFamilyId(claims.claims.familyId as string);
    };
    getFamilyId();
  }, []);

  return (
    <div className="flex flex-row space-x-1 space-y-2 flex-wrap justify-between">
      {photoId && (
        <ImageModal
          images={data ?? []}
          photoId={photoId}
          onClose={() => {
            setPhotoId(null);
          }}
          showModal
        />
      )}
      {isLoading && (
        <div className="w-full flex flex-row space-x-1 space-y-2 flex-wrap justify-between">
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
          <Skeleton className="rounded-lg h-52 w-72" />
        </div>
      )}
      {data?.map((image, index) => (
        <div
          key={image.IMAGEID}
          onClick={() => {
            setPhotoId(index);
          }}
        >
          <DownloadAbleImage image_name={image.IMAGEID} />
        </div>
      ))}
    </div>
  );
}
