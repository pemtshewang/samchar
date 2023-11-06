import Hero from "@/components/hero"
import FeatureSection from "@/components/features"
import { SiteFooter } from "@/components/site-footer"
import HomeHeader from "@/components/home-header"
import FAQPage from "@/components/faqs"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }
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
