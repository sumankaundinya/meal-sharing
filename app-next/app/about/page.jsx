export default function AboutPage() {
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
        <h1>About Us</h1>

        <p>
          Our mission:To connect home cooks and food lovers, creating memorable
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
          on Vercel & Render.
        </p>

        <h2>Meet the Founder</h2>
        <p>
          <strong>Suman Kaundinya</strong> — A food‑obsessed developer on a
          mission to make home cooking accessible to everyone.
        </p>

        <p>
          Ready to get started?{" "}
          <a href="/meals" style={{ color: "#0070f3", fontWeight: "bold" }}>
            Browse Meals →
          </a>
        </p>
      </div>
    </div>
  );
}
