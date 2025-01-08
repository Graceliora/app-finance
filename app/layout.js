import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import useServerDarkMode from "@/hooks/use-server-dark-mode";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  const theme = useServerDarkMode()

  return (
    <html lang="en" className={theme}>
<body className={`${geistMono.className} min-h-screen flex flex-col px-8`}>{children}</body>
    </html>
  );
}
