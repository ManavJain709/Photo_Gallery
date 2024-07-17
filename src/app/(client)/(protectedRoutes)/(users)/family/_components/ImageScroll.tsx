"use client";

import { useAuth } from "@/app/(client)/hooks/useAuth";
import { Image, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Fetcher } from "swr";
import useSWRInfinite from "swr/infinite";

const fetcher: Fetcher<
  {
    image_name: string;
  }[]
> = (url: string) => fetch(url).then((res) => res.json());

export default function FamilyImages() {
  const { user } = useAuth();
  const [familyId, setFamilyId] = useState<string | null>();
  const [images, setImages] = useState<
    {
      image_name: string;
    }[]
  >([]);

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (!familyId) return null;
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/family/images/${familyId}?skip=${pageIndex * 40}&take=40`; // SWR key
  };
  const { mutate, setSize, size, data } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    const getFamilyId = async () => {
      const claims = await user?.getIdTokenResult();

      if (!claims) return;
      setFamilyId(claims.claims.familyId as string);
    };
    getFamilyId();
  }, []);

  const [showLoading, setShowLoading] = useState(true);

  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const fetchedImages = await mutate();
    if (images.length === fetchedImages?.flat().length)
      return setShowLoading(false);
    setImages(fetchedImages?.flat() ?? []);
    setSize(size + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView, data]);

  return (
    <div className="w-full flex flex-col p-3">
      <div className="flex flex-row gap-3 flex-wrap">
        {images?.map((image) => (
          <div
            key={image.image_name}
            className="flex flex-col items-center justify-center"
          >
            <Image
              alt={image.image_name}
              src={image.image_name}
              width={150}
              loading="lazy"
            />
            <p>{image.image_name}</p>
          </div>
          //   <p>image</p>
        ))}
      </div>
      {showLoading && <Spinner ref={ref} />}
    </div>
  );
}
