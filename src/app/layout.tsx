import type { Metadata } from "next";
import "./../styles/globals.css";
import { AuthGuard } from "@/features/auth";

export const metadata: Metadata = {
  title: "Evolt - Chat App",
  description: "The greatest chat app ever",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
