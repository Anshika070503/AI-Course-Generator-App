// app/layout.js
import { ClerkProvider} from "@clerk/nextjs";
import { PT_Serif } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "AI Course Generator",
  description: "Custom learning paths powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ptSerif.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
