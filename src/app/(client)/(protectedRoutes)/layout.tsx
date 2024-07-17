"use client";
import { PropsWithChildren } from "react";
import { RedirectType, redirect, usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import FamilyTabs from "./(users)/family/_components/FamilyTab";
import { FamilyProvider } from "../_provider";

const Layout = ({ children }: PropsWithChildren) => {
  const { isSignedIn, pending } = useAuth();
  const pathname = usePathname();

  if (pending) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    redirect("/login", RedirectType.replace);
  }

  return (
    <FamilyProvider>
      <FamilyTabs pathname={pathname} />
      {children}
    </FamilyProvider>
  );
};

export default Layout;
