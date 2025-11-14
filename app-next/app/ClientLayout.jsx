"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar/NavBar";
import AuthNavbar from "@/components/AuthNavbar/AuthNavbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      {isHomePage ? <AuthNavbar /> : <NavBar />}
      <main>{children}</main>
    </>
  );
}
