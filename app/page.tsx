import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Highlights />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
