"use client";
import { PropsWithChildren } from "react";

import { RedirectType, redirect, usePathname } from "next/navigation";
import DashboardTabs from "../../_components/DashboardTabs";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib";

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { isSignedIn, pending, user } = useAuth();

  const admins = ["manav@arjimilgayi.com"];

  if (pending) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return redirect("/login", RedirectType.replace);
  }

  if (!admins.includes(user?.email ?? "")) {
    return redirect("/family", RedirectType.replace);
  }

  return (
    <>
      <div className="w-full justify-center items-center flex">
        <Button onClick={() => signOut(auth)}>Sign Out</Button>
        <DashboardTabs pathname={pathname} />
      </div>
      {children}
    </>
  );
};

export default Layout;
