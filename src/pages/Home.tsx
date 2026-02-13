import Hero from '../components/sections/Hero'
import SocialProof from '../components/sections/SocialProof'
import BentoGrid from '../components/sections/BentoGrid'
import Stats from '../components/sections/Stats'
import ProcessTimeline from '../components/sections/ProcessTimeline'
import Testimonials from '../components/sections/Testimonials'
import Certifications from '../components/sections/Certifications'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
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
