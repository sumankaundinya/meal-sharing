export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "2rem 3rem",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
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
