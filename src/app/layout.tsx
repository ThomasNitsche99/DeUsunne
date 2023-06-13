import { Provider } from "@/components/providers";
import "../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gambling Tracker",
  description: "Tracker for gambling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-background-foreground`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
