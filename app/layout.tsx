import "@/styles/globals.scss";
import { Press_Start_2P, VT323 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-display",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable}`}>
      <body>
        <div className={""} aria-label="background decoration" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
