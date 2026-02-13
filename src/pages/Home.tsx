import Hero from '../components/sections/Hero'
import SocialProof from '../components/sections/SocialProof'
import BentoGrid from '../components/sections/BentoGrid'
import Stats from '../components/sections/Stats'
import ProcessTimeline from '../components/sections/ProcessTimeline'
import Testimonials from '../components/sections/Testimonials'
import Certifications from '../components/sections/Certifications'
import CTA from '../components/sections/CTA'
import PageMeta from '../components/ui/PageMeta'

export default function Home() {
  return (
    <>
      <PageMeta
        title="Expert Storm Repair | PA, NJ, DE, MD, VA, NY"
        description="Guardian Roofing & Siding — Expert storm damage repair, roofing, and siding services. A+ BBB rated, serving PA, NJ, DE, MD, VA, NY. Free inspections. Call 855-424-5911."
        path="/"
      />
      <Hero />
      <SocialProof />
      <BentoGrid />
      <Stats />
      <ProcessTimeline />
      <Testimonials />
      <Certifications />
      <CTA />
    </>
  )
}
