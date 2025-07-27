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
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={poppins.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
