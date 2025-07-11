"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkStyle = (path) => ({
    marginRight: "1rem",
    textDecoration: "none",
    fontWeight: "bold",
    color: pathname === path ? "blue" : "#333",
  });

  return (
    <nav style={{ padding: "1rem", background: "#f2f2f2", textAlign: "right" }}>
      <Link href="/" style={linkStyle("/")}>
        HOME
      </Link>
      <Link href="/about" style={linkStyle("/about")}>
        ABOUT
      </Link>
      <Link href="/contact" style={linkStyle("/contact")}>
        CONTACT
      </Link>
    </nav>
  );
}
