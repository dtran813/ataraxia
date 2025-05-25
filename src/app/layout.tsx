import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/theme/ThemeContext";
import { AuthProvider } from "@/contexts/auth/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ataraxia",
    default: "Ataraxia - Focus Better, Achieve More",
  },
  description:
    "Create the perfect environment for deep work with customizable focus environments, productivity timers, and ambient audio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--color-light-100)",
                  color: "var(--color-dark-300)",
                  border: "1px solid var(--color-primary-200)",
                },
                className:
                  "dark:!bg-dark-200 dark:!text-light-100 dark:!border-primary-800",
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
