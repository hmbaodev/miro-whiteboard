import type { Metadata } from "next";

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moro Whiteboard",
  description: "Miro-liked real-time collaborated whiteboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
