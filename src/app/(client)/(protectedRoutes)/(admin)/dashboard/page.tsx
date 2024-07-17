import { FamilyDetails } from "@/app/api/family/[id]/route";
import React from "react";
import FamilyList from "./_component/FamilyList";

const getAllFamilies = async () => {
  const res = await import("@/app/api/family/[id]/route");
  const data = await (
    await res.GET({} as Request, {
      params: {
        id: "all",
      },
    })
  ).json();
  return data as FamilyDetails[];
};

const Page = async () => {
  const families = await getAllFamilies();
  return (
    <div>
      <FamilyList families={families} />
    </div>
  );
};

export default Page;
