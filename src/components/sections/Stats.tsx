import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const stats = [
  { value: '500+', label: 'Homes Restored' },
  { value: '15+', label: 'Years Experience' },
  { value: '6', label: 'States Licensed' },
  { value: '100%', label: 'Satisfaction Guarantee' },
]

export default function Stats() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-20 lg:py-28 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-4"
          >
            Why Homeowners Choose Guardian
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            We're not just contractors – we're your advocates throughout the entire process.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-guardian-blue mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
