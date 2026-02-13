import { motion } from 'framer-motion'
import { Star, Shield, Award, Medal } from 'lucide-react'
import Hero from '../components/sections/Hero'
import CTA from '../components/sections/CTA'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ratingBadges = [
  { icon: Star, label: '4.9 Stars', sublabel: '150+ reviews' },
  { icon: Shield, label: 'BBB A+ Rating', sublabel: 'Accredited' },
  { icon: Award, label: "Angie's List", sublabel: 'Super Service' },
  { icon: Medal, label: 'GuildQuality', sublabel: 'Guildmaster' },
]

const testimonials = [
  {
    name: 'Michael R.',
    location: 'Southampton',
    service: 'Roofing',
    quote:
      "Guardian made our roof replacement seamless. After a bad hail storm, Bobby came out and found damage we couldn't see from the ground. They handled everything with our insurance company and we got a brand new roof. The crew was professional, on time, and left our property cleaner than when they arrived. Couldn't be happier!",
    image: '/images/testimonial-1.webp',
  },
  {
    name: 'Jennifer T.',
    location: 'Cherry Hill',
    service: 'Storm Repair',
    quote:
      "After the storm, I didn't know where to start with my insurance claim. Guardian walked me through the entire process step by step. They met with the adjuster, documented everything, and made sure I got fair coverage. Now I have a beautiful new roof and barely paid anything out of pocket.",
    image: '/images/testimonial-2.webp',
  },
  {
    name: 'David & Susan K.',
    location: 'Wilmington',
    service: 'Siding',
    quote:
      "Professional, honest, and they stand behind their work. The new siding transformed our 1980s home into something that looks brand new. Everyone who drives by comments on how great it looks. Bobby and his team are the real deal.",
    image: '/images/testimonial-3.webp',
  },
  {
    name: 'Robert H.',
    location: 'Trenton',
    service: 'Insurance',
    quote:
      "I had three other companies come out after the storm. Two said I didn't have damage worth claiming. Guardian found significant hail damage and helped me get a full roof replacement covered by insurance. They were honest from day one and delivered exactly what they promised.",
    image: '/images/testimonial-4.webp',
  },
  {
    name: 'Paul S.',
    location: 'Philadelphia',
    service: 'Multi-Property',
    quote:
      "As a property manager, I've worked with a lot of contractors. Guardian is one of the few I trust completely. They've done roofs on multiple properties for us and every job has been excellent. Communication, quality, and pricing are all top-notch.",
    image: '/images/testimonial-5.webp',
  },
  {
    name: 'Lisa M.',
    location: 'Baltimore',
    service: 'Storm Repair',
    quote:
      "We were nervous about the whole insurance claim process, but Guardian made it so easy. They took photos, wrote up the damage report, met with our adjuster, and coordinated everything. Three weeks later we had a new roof. These guys know what they're doing.",
    image: '/images/testimonial-6.webp',
  },
  {
    name: 'Tom C.',
    location: 'Fredericksburg',
    service: 'Roofing',
    quote:
      "Great family-owned company with real Christian values. Bobby personally made sure everything was done right. When there was a small issue with some flashing, he came back the same day to fix it. That's the kind of service you don't find anymore.",
    image: '/images/testimonial-7.webp',
  },
  {
    name: 'Angela M.',
    location: 'Bucks County',
    service: 'Siding',
    quote:
      "From start to finish, Guardian exceeded our expectations. The siding samples they brought helped us choose the perfect color. Installation was quick and the crew was respectful of our property. Our home looks incredible and we've already recommended them to three neighbors.",
    image: '/images/testimonial-8.webp',
  },
]

export default function TestimonialsPage() {
  const { ref: badgeRef, isInView: badgeInView } = useScrollReveal()
  const { ref: gridRef, isInView: gridInView } = useScrollReveal()

  return (
    <>
      <Hero
        backgroundImage="/images/testimonials-hero.webp"
        headline="What Our"
        highlightText="Customers Say"
        subhead="Don't just take our word for it – see why homeowners across the region trust Guardian with their homes."
        compact
      />

      {/* Rating Badges */}
      <section className="py-10 border-b border-border" ref={badgeRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {ratingBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={badgeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <badge.icon className="w-8 h-8 text-guardian-blue mx-auto mb-2" />
                <p className="font-bold text-navy text-sm">{badge.label}</p>
                <p className="text-xs text-text-secondary">{badge.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 lg:py-28" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-text-secondary">
                      {t.location} &bull; {t.service}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-safety-orange text-safety-orange" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
