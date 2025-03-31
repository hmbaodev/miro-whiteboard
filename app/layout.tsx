import type { Metadata } from "next";

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";

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
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
