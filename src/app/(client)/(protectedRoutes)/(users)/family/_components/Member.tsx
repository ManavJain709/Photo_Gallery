"use client";
import { Button, Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import useSWR, { Fetcher } from "swr";
import DownloadAbleImage from "./DownloadAbleImage";
import { useFamily } from "@/app/(client)/hooks/useFamily";
import ImageModal from "./ImageModal";
import Link from "next/link";

type FamilyImages = {
  image_name: string;
  IMAGEID: string;
}[];

const fetcher: Fetcher<FamilyImages> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function Member({ id }: { id: string }) {
  const { isFamilyMember, isLoading } = useFamily();
  const [lastViewedPhoto, setLastViewedPhoto] = useState<string | null>();

  const [photoId, setPhotoId] = useState<number | null>(null);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto, setLastViewedPhoto]);

  const getKey = () => {
    if (!id || !isFamilyMember(parseInt(id))) return null;
    return `/api/member/${id}`; // SWR key
  };
  const { data, isLoading: isFetching } = useSWR<FamilyImages>(getKey, fetcher);

  const memberImages = data?.filter((image) => image.IMAGEID) ?? [];

  if (!isFamilyMember(parseInt(id)) && !isLoading)
    return <p>Not a family member</p>;

  return (
    <>
      {/* <Link
        href={`/family/member`}
        className="w-full justify-end items-end flex"
      >
        <Button>View All</Button>
      </Link> */}
      <div className="flex flex-row flex-wrap justify-between">
        {isFetching && (
          <>
            <Skeleton className="rounded-lg h-52 w-72" />
            <Skeleton className="rounded-lg h-52 w-72" />
            <Skeleton className="rounded-lg h-52 w-72" />
            <Skeleton className="rounded-lg h-52 w-72" />
            <Skeleton className="rounded-lg h-52 w-72" />
          </>
        )}
        {photoId !== null && (
          <ImageModal
            images={memberImages}
            photoId={photoId}
            onClose={() => {
              setPhotoId(null);
            }}
            showModal
          />
        )}
        {memberImages?.map((image, index) => (
          <div
            key={image.IMAGEID}
            onClick={() => {
              setPhotoId(index);
            }}
            className="cursor-pointer"
          >
            <DownloadAbleImage image_name={image.IMAGEID} />
          </div>
        ))}
      </div>
    </>
  );
}
