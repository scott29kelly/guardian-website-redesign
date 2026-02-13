import { motion } from 'framer-motion'
import { MapPin, Building, Clock } from 'lucide-react'
import Hero from '../components/sections/Hero'
import CTA from '../components/sections/CTA'
import { useScrollReveal } from '../hooks/useScrollReveal'

const states = [
  {
    name: 'Pennsylvania',
    badge: 'HQ',
    areas: [
      'Southampton (HQ)', 'Philadelphia', 'Bucks County', 'Montgomery County',
      'Delaware County', 'Chester County', 'Lehigh Valley', 'Doylestown',
      'Langhorne', 'Newtown', 'King of Prussia', 'Norristown',
    ],
  },
  {
    name: 'New Jersey',
    areas: [
      'Trenton', 'Cherry Hill', 'Princeton', 'Camden County',
      'Burlington County', 'Mercer County', 'Gloucester County', 'Mount Laurel',
      'Moorestown', 'Marlton', 'Voorhees', 'Haddonfield',
    ],
  },
  {
    name: 'Delaware',
    areas: [
      'Wilmington', 'Newark', 'New Castle County', 'Dover',
      'Kent County', 'Middletown', 'Bear', 'Hockessin', 'Pike Creek', 'Smyrna',
    ],
  },
  {
    name: 'Maryland',
    areas: [
      'Baltimore', 'Baltimore County', 'Harford County', 'Cecil County',
      'Howard County', 'Towson', 'Columbia', 'Bel Air', 'Elkton', 'Aberdeen',
    ],
  },
  {
    name: 'Virginia',
    badge: 'Branch',
    areas: [
      'Fredericksburg (Branch)', 'Stafford County', 'Spotsylvania County',
      'King George County', 'Caroline County', 'Richmond Area',
      'Northern Virginia', 'Woodbridge', 'Manassas',
    ],
  },
  {
    name: 'New York',
    areas: [
      'Staten Island', 'Long Island (Western)', 'Westchester County',
      'Rockland County', 'Orange County', 'Sullivan County',
      'Hudson Valley', 'Poughkeepsie', 'Newburgh',
    ],
  },
]

export default function ServiceAreas() {
  const { ref, isInView } = useScrollReveal()
  const { ref: statesRef, isInView: statesInView } = useScrollReveal()

  return (
    <>
      <Hero
        backgroundImage="/images/service-areas-hero.webp"
        headline="Areas We"
        highlightText="Serve"
        subhead="Licensed in 6 states and serving homeowners within 5 hours of our Southampton, PA headquarters."
        compact
      />

      {/* Offices */}
      <section className="py-10 border-b border-border" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 bg-surface rounded-xl border border-border p-5"
            >
              <Building className="w-6 h-6 text-guardian-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-navy text-sm">Headquarters</p>
                <p className="text-sm text-text-secondary">610 Lakeside Dr, Southampton, PA 18966</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  Mon–Fri 8am–6pm, Sat 9am–2pm
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-4 bg-surface rounded-xl border border-border p-5"
            >
              <MapPin className="w-6 h-6 text-guardian-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-navy text-sm">Virginia Branch</p>
                <p className="text-sm text-text-secondary">Fredericksburg, VA</p>
                <p className="text-xs text-text-secondary mt-1">By appointment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="py-20 lg:py-28" ref={statesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={statesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-navy mb-10 text-center"
          >
            Service Areas by State
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {states.map((state, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-navy">{state.name}</h3>
                  {state.badge && (
                    <span className="px-2 py-0.5 bg-guardian-blue/10 text-guardian-blue text-xs font-bold rounded-full">
                      {state.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {state.areas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 bg-surface text-xs text-text-secondary rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
