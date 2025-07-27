"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/meals/logo.jpg" alt="MealSharing Logo" />
        <span>MealSharing</span>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          HOME
        </Link>
        <Link href="/about" className={pathname === "/about" ? "active" : ""}>
          ABOUT
        </Link>
        <Link
          href="/contact"
          className={pathname === "/contact" ? "active" : ""}
        >
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
