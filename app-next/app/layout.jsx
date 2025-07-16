import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Meal Sharing",
  description: "Share and enjoy delicious meals together!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
