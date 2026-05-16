import Hero from '@/components/Hero'
import FlavorCarousel from '@/components/FlavorCarousel'
import PhilosophySection from '@/components/PhilosophySection'
import SocialProof from '@/components/SocialProof'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <FlavorCarousel />
      <PhilosophySection />
      <SocialProof />
      <CTASection />
    </main>
  )
}
