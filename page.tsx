import HeroSection from "@/components/hero-section"
import EducationalSection from "@/components/educational-section"
import InteractiveSimulator from "@/components/interactive-simulator"
import TechnicalDeepDive from "@/components/technical-deep-dive"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <EducationalSection />
      <InteractiveSimulator />
      <TechnicalDeepDive />
      <Footer />
    </main>
  )
}
