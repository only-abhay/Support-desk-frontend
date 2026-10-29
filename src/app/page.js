import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      <Hero />
      <Features />
    </div>
  );
}
