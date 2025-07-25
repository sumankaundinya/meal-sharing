import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Meal Sharing",
  description: "Share and enjoy delicious meals together!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
