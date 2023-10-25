import Hero from "@/components/hero"
import FeatureSection from "@/components/features"
import { SiteFooter } from "@/components/site-footer"
import HomeHeader from "@/components/home-header"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import FAQPage from "@/components/faqs"

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
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
