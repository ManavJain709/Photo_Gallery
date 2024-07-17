"use client";

import { useFamily } from "@/app/(client)/hooks/useFamily";
import { useEffect, useState } from "react";

const Member = ({ id }: { id: string }) => {
  const { fetchMember } = useFamily();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMember(parseInt(id))
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return <div>Family Member: {id}</div>;
};

export default Member;
