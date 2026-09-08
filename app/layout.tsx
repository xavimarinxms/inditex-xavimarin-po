import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casos prácticos — Product Owner",
  description:
    "Prototipos de un caso práctico de entrevista de Product Owner (Delivery Plan API).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased text-neutral-900 bg-white">
        {children}
      </body>
    </html>
  );
}
