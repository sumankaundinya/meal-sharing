"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BecomeHostPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName");

    if (!storedId) {
      router.push("/login?redirect=/become-host");
      return;
    }

    setUser({ id: storedId, name: storedName, role: storedRole });
  }, [router]);

  const handleUpgrade = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-role/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "host" }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("You are now a host!");
        localStorage.setItem("role", "host");
        router.push("/host-dashboard");
      } else {
        alert(data.message || "Failed to update role.");
      }
    } catch (err) {
      console.error("Error upgrading role:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Become a Meal Host 🍳</h1>
      <p>Ready to share your home-cooked meals with others?</p>
      <button onClick={handleUpgrade}>Become a Host</button>
    </div>
  );
}
