import React from "react";

import HomeHero from "../HomeHero/HomeHero";
import styles from "./HomePage.module.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
} from "react-icons/fa";

const HomePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, {
    cache: "no-store",
  });

  // Later, we’ll fetch the logged-in user
  const user = null;

  return (
    <div className={styles.container}>
      {/* ✅ Hero section */}
      <HomeHero user={user} />

      <footer className={styles.footer}>
        <a href="mailto:info@mealsharing.com">
          <FaEnvelope className={styles.icon} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className={styles.icon} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className={styles.icon} />
        </a>
        <a href="tel:+1234567890">
          <FaPhoneAlt className={styles.icon} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className={styles.icon} />
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
