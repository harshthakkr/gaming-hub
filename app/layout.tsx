import type { Metadata } from "next";
import { Chakra_Petch, Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GAME//HUB",
  description: "Track releases, sync your library, and discover games across every platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${chakra.variable} bg-ov-bg font-chakra text-ov-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
