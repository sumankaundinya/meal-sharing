"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./AuthNavbar.css";

const AuthNavbar = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const loadUser = () => {
      const storedName = localStorage.getItem("userName");
      const storedRole = localStorage.getItem("role");
      const userId = localStorage.getItem("userId");
      if (storedName && userId) {
        setUser({ name: storedName, role: storedRole, id: userId });
      } else {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="authNavbar">
      <div className="navbar-logo">
        <img src="/images/meals/logo.jpg" alt="MealSharing Logo" />
        <span>Meal Sharing</span>
      </div>

      <div className="authButtons">
        {user === undefined ? null : user ? (
          <>
            <span>
              Welcome, {user.name} {user.role ? `(${user.role})` : ""}
            </span>
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="button">
              Log In
            </Link>
            <Link href="/signup" className="button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default AuthNavbar;
