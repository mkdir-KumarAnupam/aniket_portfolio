// src/app/layout.js
import "./globals.css";
import { DM_Sans, Lato } from "next/font/google";
import TransitionWrapper from "@/components/TransitionWrapper";

// Define DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-dm-sans", // Used in Tailwind config as "sans"
});

// Define Lato
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato", // Used in Tailwind config as "lato"
});

export const metadata = {
  title: "KumarAniket.com",
  description: "Creative Director • Unreal TD • Photographer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${lato.variable} ${dmSans.className}`}
    >
      <body>
        <TransitionWrapper>{children}</TransitionWrapper>
      </body>
    </html>
  );
}