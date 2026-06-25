import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Roster from "@/components/Roster";
import Results from "@/components/Results";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <Roster />
      <Results />
      <Pricing />
      <Footer />
      <StickyCTA />
    </main>
  );
}
