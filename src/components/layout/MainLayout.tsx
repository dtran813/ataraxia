import { Header } from "./Header";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  fullHeight?: boolean;
}

export function MainLayout({ children, fullHeight = false }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className={`flex-grow ${fullHeight ? "flex flex-col" : ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
