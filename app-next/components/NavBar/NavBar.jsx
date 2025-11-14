"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./NavBar.css";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (storedName && userId) {
      setUser({ name: storedName, role: storedRole, id: userId });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/meals/logo.jpg" alt="MealSharing Logo" />
        <span>Meal Sharing</span>
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
        <Link
          href="/ai-chat"
          className={pathname === "/ai-chat" ? "active" : ""}
        >
          AI CHAT
        </Link>
      </div>

      {user ? (
        <div className="userSection">
          <span>
            Welcome, {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        </div>
      ) : (
        <div className="authLinks">
          <Link href="/login" className="button">
            Log In
          </Link>
          <Link href="/signup" className="button">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
