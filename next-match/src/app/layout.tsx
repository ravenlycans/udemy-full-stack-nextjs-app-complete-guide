import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "NextMatch",
  description: "A Udemy class demo app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
    const userId = session?.user?.id || null;

  return (
    <html lang="en">
      <body
        className={`antialiased h-screen`}
      >
        <Providers userId={userId}>
          <TopNav />
          <main className="container mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
