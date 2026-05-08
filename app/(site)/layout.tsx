import CursorGlow from "@/components/effects/CursorGlow";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Footer from "./sections/footer/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <CursorGlow />

      {/* 🔝 Navigation */}
      <Navbar />

      {/* 📄 Page Content */}
      <main className="bg-black text-white min-h-screen pt-20">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
