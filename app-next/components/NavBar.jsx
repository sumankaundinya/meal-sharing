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
    <nav
      style={{
        padding: "1rem",
        background: "#f2f2f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{ marginRight: "auto", display: "flex", alignItems: "center" }}
      >
        <img
          src="/images/meals/logo.jpg"
          alt="MealSharing Logo"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "0.75rem",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
          MealSharing App
        </span>
      </div>
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
