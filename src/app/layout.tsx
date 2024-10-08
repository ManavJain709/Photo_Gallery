import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UIProviders, UserAuthProvider } from "./(client)/_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UIProviders>
          <UserAuthProvider>{children}</UserAuthProvider>
        </UIProviders>
      </body>
    </html>
  );
}
