import React from "react";
import MemberList from "./_component/MemberList";
import { Family } from "@/app/api/family/route";

const getAllFamilies = async () => {
  const res = await import("@/app/api/family/route");
  const data = await (await res.GET()).json();
  return data as Family[];
};

export default async function App() {
  const families = await getAllFamilies();
  return (
    <div className="w-full p-10">
      <MemberList families={families} />
    </div>
  );
}
