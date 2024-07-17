"use client";
import { useAuth } from "@/app/(client)/hooks/useAuth";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useFamily } from "@/app/(client)/hooks/useFamily";

const AllMembers = () => {
  const { isLoading, error, data } = useFamily();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading family</div>;

  return (
    <div className="p-10">
      Welcome {data?.name} family
      <div className="flex flex-wrap gap-4">
        {data?.members.map((member) => (
          <Link
            href={"/family/member?id=" + member.id}
            key={member.id}
            className="hover:shadow-lg cursor-pointer p-4"
          >
            <Image
              alt={member.id.toString()}
              src={"http://localhost:3000/unknow_faces/" + member.id + ".jpg"}
              width={150}
              loading="lazy"
            />
            {member.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllMembers;
