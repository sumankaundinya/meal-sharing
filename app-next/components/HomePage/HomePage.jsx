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

  const user = null;

  return (
    <div className={styles.container}>
      <HomeHero user={user} />

      <footer className={styles.footer}>
        <div className={styles["icons-row"]}>
          <a href="mailto:info@mealsharing.com">
            <FaEnvelope />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a href="tel:+1234567890">
            <FaPhoneAlt />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Suman Kumar Kaundinya Jujjuru. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
