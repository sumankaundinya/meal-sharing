"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleBecomeHost = () => {
    if (!user) {
      router.push("/login?redirect=/become-host");
    } else if (user.role === "host") {
      router.push("/host-dashboard");
    } else {
      router.push("/become-host");
    }
  };

  return (
    <section className={styles.heroContainer}>
      <header className={styles.header}>
        <h1>
          Share a Plate, <br />
          Connect the World
        </h1>
        <p>Homemade Meals, Global Friendships</p>
      </header>

      <div className={styles.heroCard}>
        <img
          src="/images/meals/mealhost1.jpg"
          alt="Meal Host"
          className={styles.heroImage}
        />
        <h2>For Hosts</h2>
        <p>Share your culinary gifts</p>
        <button className={styles.heroButton} onClick={handleBecomeHost}>
          Become a Host
        </button>
      </div>

      <div className={styles.heroCard}>
        <img
          src="/images/meals/mealseek.jpg"
          alt="Meal Seekers"
          className={styles.heroImage}
        />
        <h2>For Seekers</h2>
        <p>Discover Home Cooked Meals</p>
        <Link href="/meals">
          <button className={styles.heroButton}>Find Meals</button>
        </Link>
      </div>
    </section>
  );
}
