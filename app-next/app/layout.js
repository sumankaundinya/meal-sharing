import "./globals.css";

export const metadata = {
  title: "Suman's Meal Sharing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
