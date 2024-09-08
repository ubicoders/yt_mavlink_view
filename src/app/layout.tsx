import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Appbar from "./appbar";

export const metadata: Metadata = {
  title: "Flight 6 Pack",
  description: "ubicoders flight 6 pack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Appbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
