"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.css";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/meals/logo.jpg" alt="MealSharing Logo" />
        <span>MealSharing</span>
      </div>
      <div className="navbar-links">
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
