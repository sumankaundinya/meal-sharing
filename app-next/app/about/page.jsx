import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        <h1>About Us</h1>

        <p>
          Our mission: To connect home cooks and food lovers, creating memorable
          community meals one booking at a time.
        </p>

        <h2>Why Meal Sharing?</h2>
        <ul>
          <li>Community‑driven dining experiences</li>
          <li>Verified hosts & transparent reviews</li>
          <li>Flexible booking by date & location</li>
          <li>Secure in‑app payments</li>
        </ul>

        <h2>Built With</h2>
        <p>
          Next.js (App Router), Express + Knex API, MySQL database, and hosted
          on Render.
        </p>

        <h2>Meet the Founder</h2>
        <p>
          <strong>Suman Kaundinya</strong> — A food‑obsessed developer on a
          mission to make home cooking accessible to everyone.
        </p>

        <p>
          Ready to get started?{" "}
          <a href="/meals" className={styles.browseLink}>
            Browse Meals →
          </a>
        </p>
      </div>
    </div>
  );
}
