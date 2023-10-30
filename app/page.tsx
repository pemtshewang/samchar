import Hero from "@/components/hero"
import FeatureSection from "@/components/features"
import { SiteFooter } from "@/components/site-footer"
import HomeHeader from "@/components/home-header"

export default async function Home() {
  return (
    <>
      <HomeHeader />
      <Hero />
      <FeatureSection />
      <FAQPage />
      <SiteFooter />
    </>
  )
}
