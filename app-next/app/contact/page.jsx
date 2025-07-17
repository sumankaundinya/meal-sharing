import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.contactContainer}>
        <h1>Contact Us</h1>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <ul>
          <li>Email: support@mealsharing.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: Torvestrædet 22, 2740 Skovlunde</li>
        </ul>
      </div>
    </div>
  );
}
