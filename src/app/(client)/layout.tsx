import { PropsWithChildren } from "react";
import Header from "./_components/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
