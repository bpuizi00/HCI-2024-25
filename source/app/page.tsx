import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { PropertyTypes } from "@/components/property-types"
import { PropertyCard } from "@/components/property-card"
import { HighestRated } from "@/components/highest-rated"
import { Footer } from "@/components/footer"
import { CurrentDeals } from "@/components/current-deals"
import { LandingNavBar } from "@/components/landing-nav-bar"

export default function Page() {
  return (
    <main>
      <LandingNavBar />
      <HeroSection />
      <PropertyTypes />
      <CurrentDeals />
      <HighestRated />
      <Footer />
    </main>
  )
}

