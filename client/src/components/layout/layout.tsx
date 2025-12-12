import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppButton } from "./whatsapp-button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
