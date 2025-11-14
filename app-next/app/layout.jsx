import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Meal Sharing",
  description: "Share and enjoy delicious meals together!",
};

export function generateViewport() {
  return "width=device-width, initial-scale=1";
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/meals/logo.jpg" />
      </head>
      <body className={poppins.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
