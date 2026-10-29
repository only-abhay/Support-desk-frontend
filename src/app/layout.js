import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "SupportDesk | Customer support made clear",
  description:
    "Create support tickets, follow progress, and keep every customer conversation in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
