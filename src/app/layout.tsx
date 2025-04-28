import type { Metadata } from "next";
import "./../styles/globals.css";
import { AuthGuard } from "@/features/auth";
import { Toaster } from "react-hot-toast";
import { UserSidebar } from "@/features/user";

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
      <body className="bg-gray-100 p-2 min-h-screen">
        <div className="flex flex-col md:flex-row gap-4">
          <UserSidebar />
          <div className="flex-1">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
